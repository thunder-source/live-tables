import React from 'react';
import { Button, Separator, Tooltip } from '@radix-ui/themes';
import { IoReorderThreeOutline, IoFilter, IoColorFillOutline } from 'react-icons/io5';
import { RxTable } from 'react-icons/rx';
import { FaUsers, FaRegEyeSlash } from 'react-icons/fa6';
import { PiArrowsDownUpFill } from 'react-icons/pi';
import { TbListDetails, TbArrowAutofitHeight } from 'react-icons/tb';
import { RiShareForward2Line } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';
import TableRowHeightDropDown from '@/components/dropdown/table/headerTools/TableRowHeightDropDown';
import { AgGridReact } from 'ag-grid-react';

type Props = {
  isViewActive: boolean;
  setIsViewActive: React.Dispatch<React.SetStateAction<boolean>>;
  rowHeight: number;
  setRowHeight: React.Dispatch<React.SetStateAction<number>>;
  gridRef: React.RefObject<AgGridReact<any>>;
};

export default function HeaderToolsController({
  isViewActive,
  setIsViewActive,
  rowHeight,
  setRowHeight,
  gridRef,
}: Props) {

  // useEffect(() => {
  //   console.log(gridRef.current?.api?.isAnyFilterPresent())
  // }, [gridRef.current?.api, gridRef])

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

      <Tooltip content="Upcoming Feature">
        <Button disabled variant="ghost" className="cursor-pointer ">
          <RxTable size={15} className="mr-1" />
          Grid View
          <FaUsers size={15} className="ml-1" />
          <IoIosArrowDown size={15} />
        </Button>
      </Tooltip>

      <Tooltip content="Upcoming Feature">
        <Button disabled variant="ghost" className="cursor-pointer ">
          <FaRegEyeSlash size={15} /> Hide Field
        </Button>
      </Tooltip>

      <Button onClick={() => {
        gridRef.current && gridRef.current.api.showAdvancedFilterBuilder()
      }} variant="ghost" className={clsx("cursor-pointer ", gridRef.current?.api?.isAnyFilterPresent() && "bg-accent-a6")}>
        <IoFilter size={15} /> Filter
      </Button>
      <Tooltip content="Upcoming Feature">
        <Button disabled variant="ghost" className="cursor-pointer ">
          <TbListDetails size={15} /> Group
        </Button>
      </Tooltip>
      <Tooltip content="Upcoming Feature">
        <Button disabled variant="ghost" className="cursor-pointer ">
          <PiArrowsDownUpFill size={15} /> Sort
        </Button>
      </Tooltip>
      <Tooltip content="Upcoming Feature">
        <Button disabled variant="ghost" className="cursor-pointer ">
          <IoColorFillOutline size={15} /> Color
        </Button>
      </Tooltip>

      <TableRowHeightDropDown rowHeight={rowHeight} setRowHeight={setRowHeight}>
        <Button variant="ghost" className="cursor-pointer text-accent-12">
          <TbArrowAutofitHeight size={15} /> Row Height
        </Button>
      </TableRowHeightDropDown>

      <Tooltip content="Upcoming Feature">
        <Button
          disabled
          variant="ghost"
          className="cursor-pointer"
        >
          <RiShareForward2Line size={15} /> Share and sync
        </Button>
      </Tooltip>
    </div>
  );
}
