import React, { useState } from 'react';
import { useMotionValue, Reorder, useDragControls } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { GoDatabase } from 'react-icons/go';
import SidebarTableMenuItem, { SidebarTableMenuItemProps } from './SidebarTableMenuItem';
import { TbTablePlus } from 'react-icons/tb';
import SidebarBaseContextMenu from '../contextMenu/SidebarBaseContextMenu';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { openDialog } from '@/store/features/dialog';

type Props = {
  base: {
    name: string;
    id: string;
    tableOrder: string[];
    tables: { [key: string]: SidebarTableMenuItemProps };
  };
  handleReorderEnd: () => void;
};

export default function SidebarBaseMenuItem({ base, handleReorderEnd }: Props) {
  const { name, tables, tableOrder, id } = base;
  const [tableItems, setTableItems] = useState(tableOrder || []);
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
    handleReorderEnd();
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
            onReorder={setTableItems}
            values={tableItems}
          >
            {tableOrder.map((id: string) => {
              return <SidebarTableMenuItem key={id} table={tables[id]} />;
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
