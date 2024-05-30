import { useAppDispatch } from '@/hooks/reduxHandlers';
import { updateTableOrder } from '@/store/features/sideBarBasesTables';
import { BaseConfig } from '@/types';
import debounce from '@/utils/debounce';
import { Reorder } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import TableNavigationButton from './TableNavigationButton';
import { Button } from '@radix-ui/themes';
import { openDialog } from '@/store/features/dialog';
import { TbTablePlus } from 'react-icons/tb';

export default function HeaderTableNavigationMenu({ base }: { base: BaseConfig }) {
  const { id, tableOrder, tables } = base;
  const dispatch = useAppDispatch();
  const [tableItemsOrder, setTableItemsOrder] = useState(tableOrder);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reorderTable = useCallback(
    debounce((newOrder: string[]) => {
      // console.log('update tables order', newOrder);
      dispatch(updateTableOrder({ baseId: id, tableOrder: newOrder }));
    }, 500),
    [tableItemsOrder],
  );

  useEffect(() => {
    // This is to update the tableItemsOrder whenever the tableOrder changes like curd in tables order
    if (tableOrder !== tableItemsOrder) {
      setTableItemsOrder(tableOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableOrder]);

  const handleTableReorderEnd = (newOrder: string[]) => {
    setTableItemsOrder(newOrder);
    reorderTable(newOrder);
  };
  return (
    <div className="no-scrollbar flex w-fit overflow-auto  rounded-tl-radius_2 rounded-tr-radius_2">
      <Reorder.Group
        className="flex"
        axis="x"
        values={tableItemsOrder}
        onReorder={setTableItemsOrder}
      >
        {tableItemsOrder.map((id: string) => {
          if (!tables[id]) return null;
          return (
            <TableNavigationButton
              baseId={base.id}
              key={id}
              table={tables[id]}
              handleTableReorderEnd={() => handleTableReorderEnd(tableItemsOrder)}
            />
          );
        })}
      </Reorder.Group>
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
        className="min-w-20 rounded-none"
      >
        <TbTablePlus size={20} />
      </Button>
    </div>
  );
}
