import { Button, DropdownMenu, ScrollArea, Separator, Switch, TextField } from '@radix-ui/themes';
import { Column } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import clsx from 'clsx';
import React, { ReactNode, useState, useContext } from 'react';
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



const TableSortFieldDropDown = ({ children, gridRef }: Props) => {

  const [sortFields, setSortFields] = useState<Column[]>([]);
  // console.log(sortFields)
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" size="2" className="min-h-40 w-96">
        <h4>Sort By</h4>
        <Separator size="4" orientation="horizontal" className="my-2" />
        {
          sortFields.length !== 0 ? <SortController sortFields={sortFields} setSortFields={setSortFields} /> :
            <SortListWithSearch gridRef={gridRef} sortFields={sortFields} setSortFields={setSortFields} />
        }
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const SortListWithSearch = ({
  gridRef, sortFields, setSortFields
}: {
  gridRef: React.RefObject<AgGridReact<any>>;
  sortFields: Column<any>[];
  setSortFields: React.Dispatch<React.SetStateAction<Column<any>[]>>
}) => {
  const [searchColumns, setSearchColumns] = useState('');
  console.log(sortFields)
  const allColumns =
    gridRef?.current?.api
      .getAllGridColumns()
      .filter(
        (column) =>
          column.getUserProvidedColDef()?.type !== 'primary' &&
          column.getUserProvidedColDef()?.type !== 'primary-hidden',
      ) ?? [];


  const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchColumns(e.target.value)
  }

  const filteredColumns = allColumns.filter((column) => {
    const columnDef = column.getColDef();
    return columnDef?.field && columnDef.field.toLowerCase().includes(searchColumns.toLowerCase());
  });

  const handelSelectSort = (column: Column<any>) => {
    setSortFields([column])
  }


  return (
    <div className="flex h-full flex-col">

      <TextField.Root
        className="[&>input]:outline-none"
        value={searchColumns}
        onChange={handelSearch}
        placeholder="Find a Column"
        autoFocus
      >
        <TextField.Slot>
          <IoSearchOutline />
        </TextField.Slot>
      </TextField.Root>
      <ScrollArea
        type='auto'
        scrollbars="vertical"
        className="mt-2 h-full max-h-[calc(100vh_/_1.8)] min-h-40 flex-1"
      >
        {
          filteredColumns.map((column) => {
            return <div
              key={column.getColId()}
              className={clsx(
                'sortable-item group relative my-1 flex w-full cursor-pointer select-none items-center rounded-radius_2 px-2 py-1 shadow-inner hover:bg-accent-a3',
              )}
              onClick={() => handelSelectSort(column)}
            >
              <span className=" w-full truncate">{column.getColDef()?.field}</span>
            </div>
          })
        }
      </ScrollArea>
    </div>
  );
};

const SortController = ({ sortFields, setSortFields }: {
  sortFields: Column<any>[];
  setSortFields: React.Dispatch<React.SetStateAction<Column<any>[]>>
}) => {
  return <div className="flex flex-col items-center justify-center">
    <IoSearchOutline className="text-2xl" />
    <p className="text-sm text-gray-500 mt-2">Search for a column to sort by</p>
  </div>
}


const DragHandle = SortableHandle(() => <span className="drag-handle mr-2 cursor-grab">☰</span>);

type SortableItemProps = {
  column: Column<any>;
  onClick: () => void;
  searchColumns: string;
  // isDragging: boolean;
} & SortableElementProps;

const SortableItem = SortableElement<SortableItemProps>(
  ({ column, onClick, searchColumns }: SortableItemProps) => {
    return (
      <div
        className={clsx(
          'sortable-item group relative my-1 flex w-full cursor-pointer select-none items-center rounded-radius_2 px-2 py-1 shadow-inner hover:bg-accent-a3',
        )}
        onClick={onClick}
      >
        <span className="ml-6 w-full truncate">{column.getColDef()?.field}</span>
        {!searchColumns && <DragHandle />}
      </div>
    );
  },
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
  },
);

export default TableSortFieldDropDown;
