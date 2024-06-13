import React, { useEffect, useState } from 'react';
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
import TableHideFieldsDropDown from '@/components/dropdown/table/headerTools/TableHideFieldsDropDown';
import { Column } from 'ag-grid-community';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { toggleView } from '@/store/features/tableState';
import TableSortFieldDropDown from '@/components/dropdown/table/headerTools/TableSortFieldDropDown';

type Props = {
  gridRef: React.RefObject<AgGridReact<any>>;
};

export default function HeaderToolsController({ gridRef }: Props) {
  const [hiddenFields, setHiddenFields] = useState<Column<any>[]>([]);
  // const [sortedFields, setSortedFields] = useState<Column<any>[]>([]);
  const views = useAppSelector(state => state.table.views)
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(' inside useEffect');
    const onColumnVisible = () => {
      if (gridRef.current?.api) {
        const allColumns =
          gridRef.current.api
            .getAllGridColumns()
            .filter((column) => column.getUserProvidedColDef()?.type !== 'primary-hidden') ?? [];
        setHiddenFields(allColumns.filter((column) => !column.isVisible()));
      }
    };
    if (gridRef.current?.api) {
      // Attach the event listener
      gridRef.current.api.addEventListener('columnVisible', onColumnVisible);

      // Cleanup the event listener on unmount
      return () => {
        if (gridRef.current?.api) {
          gridRef.current.api.removeEventListener('columnVisible', onColumnVisible);
        }
      };
    }
  }, [gridRef]);

  return (
    <div className="flex h-10 w-full items-center gap-6 border-b border-accent-a6 bg-accent-1 px-6 py-2">
      <Button
        onClick={() => dispatch(toggleView())}
        variant="ghost"
        className={clsx('cursor-pointer text-accent-12', views.isOpen && 'bg-accent-a4')}
      >
        <IoReorderThreeOutline size={20} /> Views
      </Button>

      <Separator orientation="vertical" className="-mx-1" />

      <TableHideFieldsDropDown gridRef={gridRef}>
        <Button
          disabled
          variant="ghost"
          className={clsx('cursor-pointer text-accent-12', hiddenFields?.length !== 0 && 'bg-accent-a7')}
        >
          <FaRegEyeSlash size={15} />{' '}
          {hiddenFields?.length !== 0 ? `${hiddenFields?.length} Hidden Fields` : 'Hide Field'}
        </Button>
      </TableHideFieldsDropDown>

      <Button
        onClick={() => {
          gridRef.current && gridRef.current.api.showAdvancedFilterBuilder();
        }}
        variant="ghost"
        className={clsx(
          'cursor-pointer text-accent-12',
          gridRef.current?.api?.isAnyFilterPresent() && 'bg-accent-a6',
        )}
      >
        <IoFilter size={15} /> Filter
      </Button>

      <TableSortFieldDropDown gridRef={gridRef}>
        <Button disabled variant="ghost" className="cursor-pointer text-accent-12">
          <PiArrowsDownUpFill size={15} /> Sort
        </Button>
      </TableSortFieldDropDown>

      <TableRowHeightDropDown gridRef={gridRef}>
        <Button variant="ghost" className="cursor-pointer text-accent-12">
          <TbArrowAutofitHeight size={15} /> Row Height
        </Button>
      </TableRowHeightDropDown>
      {/* 
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
          <TbListDetails size={15} /> Group
        </Button>
      </Tooltip>


      <Tooltip content="Upcoming Feature">
        <Button disabled variant="ghost" className="cursor-pointer ">
          <IoColorFillOutline size={15} /> Color
        </Button>
      </Tooltip>

      <Tooltip content="Upcoming Feature">
        <Button disabled variant="ghost" className="cursor-pointer">
          <RiShareForward2Line size={15} /> Share and sync
        </Button>
      </Tooltip> */}
    </div>
  );
}
