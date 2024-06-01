import React, { useEffect, useRef, useState } from 'react';
import { TableConfig } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import clsx from 'clsx';
import { Separator } from '@radix-ui/themes';
import TableDropDownMenu from '@/components/dropdown/TableDropDownMenu';

type Props = {
  handleTableReorderEnd: () => void;
  table: TableConfig;
  baseId: string;
};

const TableNavigationButton = ({ baseId, table, handleTableReorderEnd }: Props) => {
  const { name, id } = table;
  const pathName = usePathname();
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(pathName.includes(id));
  const itemRef = useRef<HTMLDivElement>(null);

  const handlePointerUp = (e: React.PointerEvent<any>) => {
    // if (e.button !== 2 && !isDragging && !contextMenuOpen) {
    //   setIsSelected(true);
    //   router.push(`/${baseId}/${table.id}`);
    // }
    setIsDragging(false);
  };

  const handleContextMenuOpen = () => {
    setContextMenuOpen(true);
  };

  const handleContextMenuClose = () => {
    setContextMenuOpen(false);
  };

  useEffect(() => {
    if (pathName.includes(id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [pathName, id]);

  // useEffect(() => {
  //   if (pathName.includes(id)) {
  //     setIsSelected(true);
  //     itemRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  //   } else {
  //     setIsSelected(false);
  //   }
  // }, [pathName, id]);

  return (
    <div
      // ref={itemRef}
      // onPointerDown={() => setIsDragging(false)}
      // onPointerUp={handlePointerUp}
      // onContextMenu={handleContextMenuOpen}
      className={clsx('relative z-40 w-full max-w-96 select-none')}
    >
      <div
        className={clsx(
          'group relative flex cursor-pointer items-center overflow-hidden truncate rounded-none rounded-tl-md rounded-tr-md px-2 py-0.5 text-sm',
          isDragging ? 'z-40 !bg-accent-8' : 'z-0 bg-accent-a1',
          isSelected ? 'z-40 !bg-accent-1' : 'z-20 hover:bg-accent-a3',
        )}
      >
        <div className="truncate px-2 py-2 capitalize ">{name}</div>
        {isSelected && <MdOutlineKeyboardArrowDown size={20} className="min-h-5 min-w-5" />}
        {!isSelected && (
          <Separator orientation="vertical" className="absolute right-0 group-hover:hidden" />
        )}
      </div>
      {/* <TableDropDownMenu
        align="end"
        baseId={baseId}
        forcedClosedLeftClick={isDragging && isSelected}
        onClose={handleContextMenuClose}
        onOpen={handleContextMenuOpen}
        table={table}
        disableOnClick
        openMenuOnSelected={isSelected}
      >
      
      </TableDropDownMenu> */}
    </div>
  );
};

export default TableNavigationButton;
