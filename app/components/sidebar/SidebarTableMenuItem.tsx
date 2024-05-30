import React, { useState } from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { MenuItem } from 'react-pro-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { TbTable, TbTableFilled } from 'react-icons/tb';
import { TableConfig } from '@/types';
import TableDropDownMenu from '../dropdown/TableDropDownMenu';

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

  console.log("contextMenuOpen", contextMenuOpen)
  const handlePointerUp = (e: React.PointerEvent<any>) => {
    // Prevent navigation on right-click and when dragging
    if (e.button !== 2 && !isDragging && !contextMenuOpen) {
      router.push(`/${baseId}/${table.id}`);
    }
    setIsDragging(false);
  };

  const handlePointerDown = (e: React.PointerEvent<any>) => {
    if (e.button !== 2) {
      setIsDragging(false);
    }
  };

  const handlePointerMove = () => {
    setIsDragging(true);
  };

  const handleContextMenuOpen = () => {
    setContextMenuOpen(true);
  };

  const handleContextMenuClose = () => {
    setContextMenuOpen(false);
  };

  return (
    <Reorder.Item
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
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
      <TableDropDownMenu
        isOpen={contextMenuOpen}
        side="right"
        baseId={baseId}
        table={table}
        onClose={handleContextMenuClose}
        onOpen={handleContextMenuOpen}
        disableOnClick
      >
        <MenuItem
          className={`${pathName.includes(id) && 'bg-accent-a4 '} truncate capitalize`}
          icon={
            pathName.includes(id) ? (
              <TbTableFilled className="h-7 w-7" />
            ) : (
              <TbTable className="h-[25px] w-[25px]" />
            )
          }
        >
          {name}
        </MenuItem>
      </TableDropDownMenu>
    </Reorder.Item>
  );
}
