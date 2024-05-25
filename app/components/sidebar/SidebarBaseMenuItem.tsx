import React, { useState } from 'react';
import { useMotionValue, Reorder, useDragControls } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { GoDatabase } from 'react-icons/go';
import SidebarTableMenuItem, { SidebarTableMenuItemProps } from './SidebarTableMenuItem';
import { TbTablePlus } from 'react-icons/tb';
import SidebarBaseContextMenu from '../contextMenu/SidebarBaseContextMenu';

type Props = {
  name: string;
  to: string;
  tables: SidebarTableMenuItemProps[];
};

export default function SidebarBaseMenuItem({ item }: { item: Props }) {
  const { name, tables, to } = item;
  const [tableItems, setTableItems] = useState(tables || []);
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const controls = useDragControls();

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Reorder.Item
      as="div"
      className="relative z-50"
      value={item}
      id={to}
      style={{ boxShadow, y }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0 }}
    >
      <SidebarBaseContextMenu>
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
            {tableItems.map((item) => (
              <SidebarTableMenuItem key={item.to} item={item} />
            ))}
          </Reorder.Group>
          <MenuItem className="select-none " icon={<TbTablePlus size={25} />}>
            {' '}
            Create Table
          </MenuItem>
        </SubMenu>
      </SidebarBaseContextMenu>
    </Reorder.Item>
  );
}
