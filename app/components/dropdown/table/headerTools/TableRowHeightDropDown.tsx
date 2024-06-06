import { DropdownMenu } from '@radix-ui/themes';
import { AgGridReact } from 'ag-grid-react';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
type Props = {
  children: ReactNode;
  gridRef: React.RefObject<AgGridReact<any>>;
};

export default function TableRowHeightDropDown({ children, gridRef }: Props) {
  const [rowHeight, setRowHeight] = useState(gridRef.current ? gridRef.current.props.rowHeight : 32)

  const rowHeightHandler = (height: number) => {
    setRowHeight(height);
    gridRef.current && gridRef.current.api.updateGridOptions({ 'rowHeight': height });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item className={clsx('outline-none  ')} onClick={() => rowHeightHandler(32)}>
          {rowHeight === 32 && <IoCheckmarkOutline className="absolute" size={15} />}
          <span className="ml-6">Short</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={clsx('outline-none  ')} onClick={() => rowHeightHandler(56)}>
          {rowHeight === 56 && <IoCheckmarkOutline className="absolute" size={15} />}
          <span className="ml-6">Medium</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={clsx('outline-none  ')} onClick={() => rowHeightHandler(88)}>
          {rowHeight === 88 && <IoCheckmarkOutline className="absolute" size={15} />}
          <span className="ml-6">Tall</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={clsx('outline-none  ')} onClick={() => rowHeightHandler(128)}>
          {rowHeight === 128 && <IoCheckmarkOutline className="absolute" size={15} />}
          <span className="ml-6">Extra Tall</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
