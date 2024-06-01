import { useAppDispatch } from '@/hooks/reduxHandlers';
import { updateTableOrder } from '@/store/features/sideBarBasesTables';
import { BaseConfig } from '@/types';
import debounce from '@/utils/debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TableNavigationButton from './TableNavigationButton';
import { Button } from '@radix-ui/themes';
import { openDialog } from '@/store/features/dialog';
import { TbTablePlus } from 'react-icons/tb';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TableSearchListDropDown from '@/components/dropdown/TableSearchListDropDown';
import { SortableContainer, SortableContainerProps, SortableElement, SortableElementProps, } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

export default function HeaderTableNavigationMenu({ base }: { base: BaseConfig }) {
  const { id, tableOrder, tables } = base;
  const dispatch = useAppDispatch();
  const [tableItemsOrder, setTableItemsOrder] = useState(tableOrder);
  const [atLeftmost, setAtLeftmost] = useState(true);
  const [atRightmost, setAtRightmost] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  // const reorderTable = useCallback(
  //   debounce((newOrder: string[]) => {
  //     dispatch(updateTableOrder({ baseId: id, tableOrder: newOrder }));
  //   }, 0),
  //   [dispatch, id],
  // );

  useEffect(() => {
    if (tableOrder !== tableItemsOrder) {
      setTableItemsOrder(tableOrder);
    }
  }, [tableOrder, tableItemsOrder]);

  const handleTableReorderEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newOrder = arrayMoveImmutable(tableItemsOrder, oldIndex, newIndex);
    setTableItemsOrder(newOrder);
    dispatch(updateTableOrder({ baseId: id, tableOrder: newOrder }));
  };

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollTo({
        left: listRef.current.scrollLeft - listRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollTo({
        left: listRef.current.scrollLeft + listRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setAtLeftmost(scrollLeft === 0);
      setAtRightmost(scrollLeft + clientWidth >= scrollWidth);
      sessionStorage.setItem('scrollPosition', scrollLeft.toString());
    }
  };

  useEffect(() => {
    const currentListRef = listRef.current;
    if (currentListRef) {
      currentListRef.addEventListener('scroll', handleScroll);

      return () => {
        currentListRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const SortableItem = SortableElement<SortableElementProps & { tableId: string }>(({ tableId }: { tableId: string }) => {

    if (!tables[tableId]) {
      return
    }

    return <TableNavigationButton
      baseId={base.id}
      key={tableId}
      table={tables[tableId]}
      handleTableReorderEnd={() => handleTableReorderEnd({ oldIndex: 0, newIndex: 0 })} // Adjust accordingly
    />
  });

  const SortableList = SortableContainer<SortableContainerProps & { items: string[] }>(({ items }: { items: string[] }) => (
    <div className="no-scrollbar relative flex" ref={listRef} style={{ overflowX: 'scroll' }}>
      {items.map((id, index) => (
        <SortableItem key={`item-${id}`} index={index} tableId={id} />
      ))}
    </div>
  ));

  return (
    <div className="flex gap-2 bg-accent-a3">
      <div className="relative flex overflow-hidden rounded-md bg-accent-a3">
        <div className="relative flex overflow-hidden rounded-md px-2">
          {/* {(!atLeftmost && (
            <div className="absolute left-0 z-50 h-11 min-w-10">
              <Button onClick={scrollLeft} className="h-full cursor-pointer rounded-none bg-accent-8">
                <FaChevronLeft size={15} />
              </Button>
            </div>
          ))} */}

          <SortableList items={tableItemsOrder} onSortEnd={handleTableReorderEnd} axis="x" />

          {/* {(!atRightmost && (
            <div className="absolute right-0 z-40 h-11 min-w-10">
              <Button onClick={scrollRight} className="h-full cursor-pointer rounded-none bg-accent-8">
                <FaChevronRight size={15} />
              </Button>
            </div>
          ))} */}
        </div>
        <TableSearchListDropDown base={base}>
          <Button
            variant="soft"
            size="3"
            className="relative z-50 h-full cursor-pointer bg-accent-a1 hover:bg-accent-a3"
          >
            <FaChevronDown size={15} />
          </Button>
        </TableSearchListDropDown>
        <Button
          variant="soft"
          size="3"
          onClick={() => {
            dispatch(
              openDialog({
                actionType: 'CREATE',
                entityType: 'TABLE',
                additionalOptions: { tableOrder: tableOrder || [] },
                entityId: id,
              }),
            );
          }}
          className="relative z-50 h-full min-w-20 cursor-pointer bg-accent-a1 hover:bg-accent-a3"
        >
          <TbTablePlus size={20} /> Create Table
        </Button>
      </div>
    </div>
  );
}
