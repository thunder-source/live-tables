/* eslint-disable no-unused-vars */
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { updateTableOrder } from '@/store/features/sideBarBasesTables';
import { BaseConfig, TableConfig } from '@/types';
import { DropdownMenu, ScrollArea, Separator, TextField } from '@radix-ui/themes';
import { useParams, useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';
import { IoSearchOutline, IoCheckmark } from 'react-icons/io5';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle,
  SortableElementProps,
  SortableContainerProps,
} from 'react-sortable-hoc';

type Props = {
  children: ReactNode;
  base: BaseConfig;
  align?: 'center' | 'end' | 'start' | undefined;
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
};

export default function TableSearchListDropDown({
  children,
  base,
  align = 'start',
  side = 'bottom',
}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        align={align}
        side={side}
        variant="soft"
        size="2"
        className="min-h-40 w-96"
      >
        <SortableListWithSearch base={base} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

const DragHandle = SortableHandle(() => (
  <span className="drag-handle invisible mr-2 cursor-grab group-hover:visible">☰</span>
));

type SortableItemProps = {
  table: TableConfig;
  isActive: boolean;
  onClick: () => void;
  searchTable: string;
} & SortableElementProps;

const SortableItem = SortableElement<SortableItemProps>(
  ({ table, isActive, onClick, searchTable }: SortableItemProps) => (
    <div
      className={`sortable-item group relative my-1 flex w-full cursor-pointer select-none items-center rounded-radius_2 px-2 py-1 hover:bg-accent-a3 ${isActive ? 'bg-accent-a3' : ''}`}
      onClick={onClick}
    >
      {isActive && <IoCheckmark className="absolute mr-2" />}
      <span className="ml-6 w-full truncate">{table.name}</span>
      {searchTable === '' && <DragHandle />}
    </div>
  ),
);

type SortableListProps = {
  items: TableConfig[] | [];
  activeTableId: string | null;
  onItemClick: (id: string) => void;
  searchTable: string;
} & SortableContainerProps;

const SortableList = SortableContainer<SortableListProps>(
  ({ items, activeTableId, onItemClick, searchTable }: SortableListProps) => {
    return (
      <ul className="mr-2 flex h-full flex-col items-center justify-center">
        {items.map((table, index) => (
          <SortableItem
            key={`item-${table.id}`}
            index={index}
            table={table}
            isActive={table.id === activeTableId}
            onClick={() => onItemClick(table.id)}
            searchTable={searchTable}
          />
        ))}
        {items.length === 0 && (
          <div className="flex h-40 items-center justify-center">No Tables Found</div>
        )}
      </ul>
    );
  },
);

const SortableListWithSearch = ({ base }: { base: BaseConfig }) => {
  const param = useParams();
  const router = useRouter();
  let activeTable = null;
  if (typeof param?.tableId === 'string') {
    activeTable = param?.tableId;
  }

  const dispatch = useAppDispatch();
  const [searchTable, setSearchTable] = useState('');
  const [tableOrder, setTableOrder] = useState(base.tableOrder);
  const [activeTableId, setActiveTableId] = useState<string | null>(activeTable ?? null);

  const handleSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newOrder = arrayMove(tableOrder, oldIndex, newIndex);
    setTableOrder(newOrder);
    // Dispatch the new order to the store
    dispatch(updateTableOrder({ baseId: base.id, tableOrder: newOrder }));
  };

  const handleItemClick = (id: string) => {
    setActiveTableId(id);
    if (base.tableOrder.includes(id)) {
      router.push(`/${base.id}/${id}`);
    }
  };

  const filteredTables = tableOrder
    .filter((tableId) => {
      const table = base.tables[tableId];
      return table && table.name.toLowerCase().includes(searchTable.toLowerCase());
    })
    .map((tableId) => base.tables[tableId]);

  console.log(filteredTables);

  return (
    <>
      <TextField.Root
        className="[&>input]:outline-none"
        value={searchTable}
        onChange={(e) => setSearchTable(e.target.value)}
        placeholder="Find a Table"
        autoFocus
      >
        <TextField.Slot className="">
          <IoSearchOutline />
        </TextField.Slot>
      </TextField.Root>
      <Separator size="4" orientation="horizontal" className="mt-2" />
      <ScrollArea scrollbars="vertical" className="mt-2 max-h-[calc(100vh_/_1.5)]">
        <SortableList
          items={filteredTables}
          onSortEnd={handleSortEnd}
          useDragHandle
          axis="y"
          activeTableId={activeTableId}
          onItemClick={handleItemClick}
          searchTable={searchTable}
        />
      </ScrollArea>
    </>
  );
};
