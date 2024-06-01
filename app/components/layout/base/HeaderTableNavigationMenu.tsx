import { useAppDispatch } from '@/hooks/reduxHandlers';
import { updateTableOrder } from '@/store/features/sideBarBasesTables';
import { BaseConfig } from '@/types';
import debounce from '@/utils/debounce';
import { Reorder, AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TableNavigationButton from './TableNavigationButton';
import { Button } from '@radix-ui/themes';
import { openDialog } from '@/store/features/dialog';
import { TbTablePlus } from 'react-icons/tb';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TableSearchListDropDown from '@/components/dropdown/TableSearchListDropDown';

export default function HeaderTableNavigationMenu({ base }: { base: BaseConfig }) {
  const { id, tableOrder, tables } = base;
  const isAtLeftmost = sessionStorage.getItem('AtLeftmost');
  const isAtRightmost = sessionStorage.getItem('AtRightmost');
  const dispatch = useAppDispatch();
  const [tableItemsOrder, setTableItemsOrder] = useState(tableOrder);
  const [atLeftmost, setAtLeftmost] = useState(isAtLeftmost == 'true' ? false : true);
  const [atRightmost, setAtRightmost] = useState(isAtRightmost == 'true' ? false : true);
  const listRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reorderTable = useCallback(
    debounce((newOrder: string[]) => {
      dispatch(updateTableOrder({ baseId: id, tableOrder: newOrder }));
    }, 500),
    [dispatch, id],
  );

  useEffect(() => {
    if (tableOrder !== tableItemsOrder) {
      setTableItemsOrder(tableOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableOrder]);

  const handleTableReorderEnd = (newOrder: string[]) => {
    setTableItemsOrder(newOrder);
    reorderTable(newOrder);
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
      sessionStorage.setItem('AtLeftmost', (scrollLeft === 0).toString());
      sessionStorage.setItem('AtRightmost', (scrollLeft + clientWidth >= scrollWidth).toString());
    }
  };

  useEffect(() => {
    const currentListRef = listRef.current;
    if (currentListRef) {
      currentListRef.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => {
        currentListRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="flex gap-2">
      <div className="relative flex overflow-hidden rounded-md bg-accent-a3">
        <div className="relative flex overflow-hidden rounded-md px-2">
          <AnimatePresence>
            {!atLeftmost && (
              <motion.div
                key="left-button"
                initial={{ opacity: 0, left: -100 }}
                animate={{ opacity: 1, left: 0 }}
                exit={{ opacity: 0, left: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 z-50 h-9 min-w-10"
              >
                <Button
                  onClick={scrollLeft}
                  className="h-full cursor-pointer rounded-none bg-accent-8"
                >
                  <FaChevronLeft size={15} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <Reorder.Group
            className="no-scrollbar relative flex"
            axis="x"
            layoutScroll
            ref={listRef}
            values={tableItemsOrder}
            onReorder={setTableItemsOrder}
            style={{ overflowX: 'scroll' }}
          >
            {tableItemsOrder.map((id: string) => {
              if (!tables[id]) return null;
              return (
                <TableNavigationButton
                  listRef={listRef}
                  baseId={base.id}
                  key={id}
                  table={tables[id]}
                  handleTableReorderEnd={() => handleTableReorderEnd(tableItemsOrder)}
                />
              );
            })}
          </Reorder.Group>

          <AnimatePresence>
            {!atRightmost && (
              <motion.div
                key="right-button"
                initial={{ opacity: 0, right: -50 }}
                animate={{ opacity: 1, right: 0 }}
                exit={{ opacity: 0, right: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 z-40 h-9 min-w-10"
              >
                <Button
                  onClick={scrollRight}
                  className="h-full cursor-pointer rounded-none bg-accent-8"
                >
                  <FaChevronRight size={15} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <TableSearchListDropDown base={base} align="start">
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
