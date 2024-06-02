import React from 'react';
import { Button, Separator } from '@radix-ui/themes';
import { IoReorderThreeOutline, IoFilter, IoColorFillOutline } from 'react-icons/io5';
import { RxTable } from 'react-icons/rx';
import { FaUsers, FaRegEyeSlash } from 'react-icons/fa6';
import { PiArrowsDownUpFill } from 'react-icons/pi';
import { TbListDetails, TbArrowAutofitHeight } from 'react-icons/tb';
import { RiShareForward2Line } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';
import TableRowHeightDropDown from '@/components/dropdown/TableRowHeightDropDown';

type Props = {
  isViewActive: boolean;
  setIsViewActive: React.Dispatch<React.SetStateAction<boolean>>;
  rowHeight: number;
  setRowHeight: React.Dispatch<React.SetStateAction<number>>;
};

export default function HeaderToolsController({
  isViewActive,
  setIsViewActive,
  rowHeight,
  setRowHeight,
}: Props) {
  return (
    <div className="flex h-10 w-full items-center gap-6 border-b border-accent-a6 bg-accent-1 px-6 py-2">
      <Button
        onClick={() => setIsViewActive(!isViewActive)}
        variant="ghost"
        className={clsx('cursor-pointer text-accent-12', isViewActive && 'bg-accent-a4')}
      >
        <IoReorderThreeOutline size={20} /> Views
      </Button>

      <Separator orientation="vertical" className="-mx-1" />

      <Button variant="ghost" className="cursor-pointer text-accent-12">
        <RxTable size={15} className="mr-1" />
        Grid View
        <FaUsers size={15} className="ml-1" />
        <IoIosArrowDown size={15} />
      </Button>

      <Button variant="ghost" className="cursor-pointer text-accent-12">
        <FaRegEyeSlash size={15} /> Hide Field
      </Button>

      <Button variant="ghost" className="cursor-pointer text-accent-12">
        <IoFilter size={15} /> Filter
      </Button>

      <Button variant="ghost" className="cursor-pointer text-accent-12">
        <TbListDetails size={15} /> Group
      </Button>

      <Button variant="ghost" className="cursor-pointer text-accent-12">
        <PiArrowsDownUpFill size={15} /> Sort
      </Button>

      <Button variant="ghost" className="cursor-pointer text-accent-12">
        <IoColorFillOutline size={15} /> Color
      </Button>

      <TableRowHeightDropDown rowHeight={rowHeight} setRowHeight={setRowHeight}>
        <Button variant="ghost" className="cursor-pointer text-accent-12">
          <TbArrowAutofitHeight size={15} /> Row Height
        </Button>
      </TableRowHeightDropDown>

      <Button variant="ghost" className="cursor-pointer text-accent-12">
        <RiShareForward2Line size={15} /> Share and sync
      </Button>
    </div>
  );
}
