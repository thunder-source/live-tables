import React, { useCallback, useEffect, useState } from 'react';
import { useMotionValue, Reorder, useDragControls } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { GoDatabase } from 'react-icons/go';
import SidebarTableMenuItem from './SidebarTableMenuItem';
import { TbTablePlus } from 'react-icons/tb';
import SidebarBaseContextMenu from '../contextMenu/SidebarBaseContextMenu';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { openDialog } from '@/store/features/dialog';
import debounce from '@/utils/debounce';
import { updateTableOrder } from '@/store/features/sideBarBasesTables';
import { BaseConfig } from '@/types';

type Props = {
  base: BaseConfig;
  handleBaseReorderEnd: () => void;
};

export default function SidebarBaseMenuItem({ base, handleBaseReorderEnd }: Props) {
  const { name, tables, tableOrder, id } = base;
  const [tableItemsOrder, setTableItemsOrder] = useState(tableOrder || []);
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const controls = useDragControls();
  const dispatch = useAppDispatch();
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    handleBaseReorderEnd();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reorderTable = useCallback(
    debounce((newOrder: string[]) => {
      console.log('update tables order', newOrder);
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
    <Reorder.Item
      as="div"
      className="relative z-50"
      value={id}
      id={id}
      style={{ boxShadow, y }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0 }}
    >
      <SidebarBaseContextMenu base={base}>
        <SubMenu
          icon={<GoDatabase size={25} />}
          open={isOpen}
          label={name}
          onClick={() => {
            if (!isDragging) setIsOpen(!isOpen);
          }}
          onPointerDown={(e) => controls.start(e)}
          className="overflow-hidden truncate"
        >
          <Reorder.Group
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
            onReorder={setTableItemsOrder}
            values={tableItemsOrder}
          >
            {tableItemsOrder.map((id: string) => {
              if (!tables[id]) return null;
              return (
                <SidebarTableMenuItem
                  baseId={base.id}
                  key={id}
                  table={tables[id]}
                  handleTableReorderEnd={() => handleTableReorderEnd(tableItemsOrder)}
                />
              );
            })}
          </Reorder.Group>
          <MenuItem
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
            className="select-none "
            icon={<TbTablePlus size={25} />}
          >
            {' '}
            Create Table
          </MenuItem>
        </SubMenu>
      </SidebarBaseContextMenu>
    </Reorder.Item>
  );
}
