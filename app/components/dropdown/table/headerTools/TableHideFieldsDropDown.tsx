import {
  Button,
  DropdownMenu,
  ScrollArea,
  Separator,
  Switch,
  TextField,
} from '@radix-ui/themes';
import { Column } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import clsx from 'clsx';
import React, {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

type Props = {
  children: ReactNode;
  gridRef: React.RefObject<AgGridReact<any>>;
};

type VisibilityContextType = {
  columnVisibility: { [key: string]: boolean };
  setColumnVisibility: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(
  undefined
);

const TableHideFieldsDropDown = ({ children, gridRef }: Props) => {
  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <VisibilityContext.Provider value={{ columnVisibility, setColumnVisibility }}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft" size="2" className="min-h-40 w-96">
          <SortableListWithSearchAndSwitch gridRef={gridRef} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </VisibilityContext.Provider>
  );
};

const SortableListWithSearchAndSwitch = ({
  gridRef,
}: {
  gridRef: React.RefObject<AgGridReact<any>>;
}) => {
  const allColumns =
    gridRef?.current?.api
      .getAllGridColumns()
      .filter((column) => column.getUserProvidedColDef()?.type !== 'primary') ?? [];
  const { setColumnVisibility } = useContext(VisibilityContext)!;

  const [columnsOrder, setColumnsOrder] = useState(allColumns);
  const [searchColumns, setSearchColumns] = useState('');

  useEffect(() => {
    setColumnsOrder(allColumns);
    const visibilityState = allColumns.reduce((acc, column) => {
      acc[column.getColId()] = column.isVisible();
      return acc;
    }, {} as { [key: string]: boolean });
    setColumnVisibility(visibilityState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setColumnVisibility]);

  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newOrder = arrayMove(columnsOrder, oldIndex, newIndex);
    setColumnsOrder(newOrder);
    gridRef.current?.api.moveColumnByIndex(oldIndex + 2, newIndex + 2);
  };

  const filteredColumns = columnsOrder.filter((column) => {
    const columnDef = column.getColDef();
    return (
      columnDef?.field &&
      columnDef.field.toLowerCase().includes(searchColumns.toLowerCase())
    );
  });

  const handleItemClick = (column: any) => {
    gridRef.current &&
      gridRef.current.api.setColumnsVisible([column], !column.visible);
    setColumnVisibility((prev) => ({
      ...prev,
      [column.getColId()]: column.visible,
    }));
  };

  const hideAllColumns = () => {
    gridRef.current && gridRef.current.api.setColumnsVisible(allColumns, false);
    setColumnVisibility(
      allColumns.reduce((acc, column) => {
        acc[column.getColId()] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    );
  };

  const showAllColumns = () => {
    gridRef.current && gridRef.current.api.setColumnsVisible(allColumns, true);
    setColumnVisibility(
      allColumns.reduce((acc, column) => {
        acc[column.getColId()] = true;
        return acc;
      }, {} as { [key: string]: boolean })
    );
  };

  return (
    <div className="flex flex-col h-full">
      <TextField.Root
        className="[&>input]:outline-none"
        value={searchColumns}
        onChange={(e) => setSearchColumns(e.target.value)}
        placeholder="Find a Table"
        autoFocus
      >
        <TextField.Slot>
          <IoSearchOutline />
        </TextField.Slot>
      </TextField.Root>
      <Separator size="4" orientation="horizontal" className="mt-2" />
      <ScrollArea
        scrollbars="vertical"
        className="flex-1 min-h-40 mt-2 h-full max-h-[calc(100vh_/_1.5)]"
      >
        <SortableList
          onSortEnd={handleSortEnd}
          useDragHandle
          axis="y"
          items={filteredColumns}
          onItemClick={handleItemClick}
          searchColumns={searchColumns}
          lockAxis='y'
          lockToContainerEdges={true}
        />
      </ScrollArea>
      <Separator size="4" orientation="horizontal" className="my-2" />
      <div className="flex w-full gap-2 mt-auto">
        <Button variant="soft" className="flex-1" onClick={hideAllColumns}>
          Hide all
        </Button>
        <Button variant="soft" className="flex-1" onClick={showAllColumns}>
          Show all
        </Button>
      </div>
    </div>
  );
};

const DragHandle = SortableHandle(() => (
  <span className="drag-handle mr-2 cursor-grab">☰</span>
));

type SortableItemProps = {
  column: Column<any>;
  onClick: () => void;
  searchColumns: string;
  // isDragging: boolean;
} & SortableElementProps;

const SortableItem = SortableElement<SortableItemProps>(
  ({ column, onClick, searchColumns, }: SortableItemProps) => {
    const { columnVisibility } = useContext(VisibilityContext)!;
    const isVisible = columnVisibility[column.getColId()] ?? true;
    return (
      <div
        className={clsx(
          "shadow-inner sortable-item group relative my-1 flex w-full cursor-pointer select-none items-center rounded-radius_2 px-2 py-1 hover:bg-accent-a3",

        )}
        onClick={onClick}
      >
        <Switch variant="classic" checked={isVisible} size="1" />
        <span className="ml-6 w-full truncate">{column.getColDef()?.field}</span>
        {!searchColumns && <DragHandle />}
      </div>
    );
  }
);

type SortableListProps = {
  items: Column<any>[];
  // eslint-disable-next-line no-unused-vars
  onItemClick: (column: Column<any>) => void;
  searchColumns: string;
} & SortableContainerProps;

const SortableList = SortableContainer<SortableListProps>(
  ({ items, onItemClick, searchColumns }: SortableListProps) => {
    return (
      <ul className="mr-2 flex h-full flex-col items-center justify-center">
        {items.map((column, index) => (
          <SortableItem
            key={`item-${column.getColId()}`}
            index={index}
            column={column}
            onClick={() => onItemClick(column)}
            searchColumns={searchColumns}
          />
        ))}
        {items.length === 0 && (
          <div className="flex h-40 items-center justify-center">
            No Columns available to be hidden
          </div>
        )}
      </ul>
    );
  }
);

export default TableHideFieldsDropDown;
