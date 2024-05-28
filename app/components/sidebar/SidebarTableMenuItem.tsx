import React, { useState } from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { MenuItem } from 'react-pro-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import SidebarTableContextMenu from '../contextMenu/SidebarTableContextMenu';
import { TbTable, TbTableFilled } from 'react-icons/tb';
import { TableConfig } from '@/types';

export default function SidebarTableMenuItem({
  baseId,
  table,
  handleTableReorderEnd,
}: {
  baseId: string;
  handleTableReorderEnd: () => void;
  table: TableConfig;
}) {
  const { name, id } = table;
  const [isDragging, setIsDragging] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const pathName = usePathname();
  const router = useRouter();

  const handlePointerUp = (e: React.PointerEvent<any>) => {
    // Prevent navigation on right-click and when dragging
    if (e.button !== 2 && !isDragging && !contextMenuOpen) {
      router.push(`/${baseId}/${table.id}`);
    }
    setIsDragging(false);
  };

  const handleContextMenuOpen = (e: React.MouseEvent<any, MouseEvent>) => {
    e.preventDefault();
    setContextMenuOpen(true);
  };

  const handleContextMenuClose = () => {
    setContextMenuOpen(false);
  };

  return (
    <Reorder.Item
      onPointerDown={() => setIsDragging(false)}
      onPointerMove={() => setIsDragging(true)}
      onPointerUp={handlePointerUp}
      onContextMenu={handleContextMenuOpen}
      as="div"
      className="relative z-50"
      value={id}
      id={id}
      style={{ boxShadow, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0 }}
      onDragEnd={handleTableReorderEnd}
    >
      <SidebarTableContextMenu baseId={baseId} table={table} onClose={handleContextMenuClose}>
        <MenuItem
          className={`${pathName === id && 'bg-accent-a4'} truncate capitalize`}
          icon={
            pathName === id ? (
              <TbTableFilled className="h-7 w-7" />
            ) : (
              <TbTable className="h-[25px] w-[25px]" />
            )
          }
        >
          {name}
        </MenuItem>
      </SidebarTableContextMenu>
    </Reorder.Item>
  );
}
