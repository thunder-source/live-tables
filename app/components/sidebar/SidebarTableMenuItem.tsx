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
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Reorder.Item
      onPointerDown={() => setIsDragging(false)}
      onPointerMove={() => setIsDragging(true)}
      onPointerUp={(e) => {
        // Right-click
        // Prevent navigation and allow default context menu behavior
        if (e.button !== 2) {
          if (!isDragging) {
            // router.push(id, { scroll: false });
          }
          setIsDragging(false);
        }
      }}
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
      <SidebarTableContextMenu baseId={baseId} table={table}>
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
