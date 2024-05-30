import { Reorder, useMotionValue } from 'framer-motion';
import React, { useState } from 'react';
import { TableConfig } from '@/types';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import clsx from 'clsx';
import { Button } from '@radix-ui/themes';
import TableDropDownMenu from '@/components/dropdown/TableDropDownMenu';

type Props = {
  handleTableReorderEnd: () => void;
  table: TableConfig;
  baseId: string;
};

export default function TableNavigationButton({ baseId, table, handleTableReorderEnd }: Props) {
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
      <TableDropDownMenu baseId={baseId} onClose={handleContextMenuClose} table={table} key={id}>
        <Button
          variant="soft"
          size="3"
          className={clsx(
            'relative z-20 mx-2 flex cursor-pointer items-center',
            pathName.includes(id) ? 'rounded-none bg-accent-1' : 'rounded-none',
          )}
        >
          <div className="truncate px-2 py-2 capitalize ">{name}</div>
          {pathName.includes(id) && <MdOutlineKeyboardArrowDown className="" size={20} />}
          {/* {!pathName.includes(id) && <Separator orientation="vertical" size='4' className='absolute right-0 z-10' />} */}
          {/* {!pathName.includes(id) && <Separator orientation="vertical" size='4' className='absolute left-0 z-10' />} */}
        </Button>
      </TableDropDownMenu>
    </Reorder.Item>
  );
}
