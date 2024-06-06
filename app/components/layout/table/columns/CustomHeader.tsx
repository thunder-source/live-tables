/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { CustomHeaderProps } from 'ag-grid-react';
import { Button, Checkbox, Tooltip } from '@radix-ui/themes';
import ColumnMenuDropDown from '@/components/dropdown/table/column/ColumnMenuDropDown';
import { BiSolidDownArrow } from 'react-icons/bi';
import clsx from 'clsx';
import { IoIosAdd } from 'react-icons/io';
import { generateColumnId } from '@/utils';
export interface MyCustomHeaderProps extends CustomHeaderProps {
  menuIcon: string;
}
type props = {
  props: CustomHeaderProps;
};

export default function CustomHeader({ props }: props) {
  //   const [ascSort, setAscSort] = useState('inactive');
  //   const [descSort, setDescSort] = useState('inactive');
  //   const [noSort, setNoSort] = useState('inactive');
  //   const refButton = useRef(null);

  const onAddColumn = () => {
    const newColDef = {
      headerName: 'New Column',
      field: generateColumnId(),
      colId: generateColumnId(),
      editable: true,
      width: 160,
      columnType: 'text',
      // field: 'Notes',
      // type: 'text',
      // colId: generateColumnId(),
      // editable: true,
    };

    const allCOlumns = props.api.getColumnDefs();
    if (Array.isArray(allCOlumns)) {
      const updatedColDefs = [...allCOlumns, newColDef];
      props.api.setColumnDefs(updatedColDefs);
    }
  };

  //   const onMenuClicked = () => {
  //     props.showColumnMenu(refButton.current!);
  //   };

  //   const onSortChanged = () => {
  //     setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
  //     setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
  //     setNoSort(
  //       !props.column.isSortAscending() && !props.column.isSortDescending() ? 'active' : 'inactive',
  //     );
  //   };

  //   const onSortRequested = (order: 'asc' | 'desc' | null, event: any) => {
  //     props.setSort(order, event.shiftKey);
  //   };

  //   useEffect(() => {
  //     props.column.addEventListener('sortChanged', onSortChanged);
  //     onSortChanged();
  //   }, []);

  //   let menu = null;
  //   if (props.enableMenu) {
  //     menu = (
  //       <div ref={refButton} className="customHeaderMenuButton" onClick={() => onMenuClicked()}>
  //         <i className={`fa ${props.menuIcon}`}></i>
  //       </div>
  //     );
  //   }

  //   let sort = null;
  //   if (props.enableSorting) {
  //     sort = (
  //       <div style={{ display: 'inline-block' }}>
  //         <div
  //           onClick={(event) => onSortRequested('asc', event)}
  //           onTouchEnd={(event) => onSortRequested('asc', event)}
  //           className={`customSortDownLabel ${ascSort}`}
  //         >
  //           <i className="fa fa-long-arrow-alt-down"></i>
  //         </div>
  //         <div
  //           onClick={(event) => onSortRequested('desc', event)}
  //           onTouchEnd={(event) => onSortRequested('desc', event)}
  //           className={`customSortUpLabel ${descSort}`}
  //         >
  //           <i className="fa fa-long-arrow-alt-up"></i>
  //         </div>
  //         <div
  //           onClick={(event) => onSortRequested(null, event)}
  //           onTouchEnd={(event) => onSortRequested(null, event)}
  //           className={`customSortRemoveLabel ${noSort}`}
  //         >
  //           <i className="fa fa-times"></i>
  //         </div>
  //       </div>
  //     );
  //   }

  if (props.column.getColId() === 'primaryColumn') {
    return (
      <div className="flex h-full w-full items-center justify-between bg-accent-a3 pl-4">
        <Checkbox />
      </div>
    );
  }
  // if (props.column.getColId() === 'AddColumn') {
  //     return (
  //         <div className="flex h-full w-full items-center justify-between bg-accent-a3 pl-4">
  //             <Button variant="ghost" size="1" radius="full">
  //                 <i className="fa fa-plus"></i>
  //             </Button>
  //         </div>
  //     );
  // }

  const allCOlumns = props.api.getAllGridColumns();

  // if (allCOlumns[allCOlumns.length - 1].getColId() === props.column.getColId()) {
  //     console.log("last column")
  //     return <>hol</>
  // }
  // console.log()

  //

  // console.log(props. )
  // console.log(selectedColumns)

  return (
    <div
      // onClick={() => {
      //   setSelectedColumns(props.column.getColDef());
      // }}
      className={clsx('flex h-full w-full')}
    >
      <ColumnMenuDropDown props={props}>
        <div
          className="flex h-full w-full items-center justify-between border-r-[1px] border-gray-a4 bg-accent-a3  px-1 "
          style={{ width: props.column.getActualWidth + 'px' }}
        >
          <Tooltip content={props.displayName}>
            <h5 className="truncate">{props.displayName}</h5>
          </Tooltip>
          <Button variant="soft" size="1" className="m-0 h-6 w-6 rounded-full p-0">
            <BiSolidDownArrow size={10} />
          </Button>
        </div>
      </ColumnMenuDropDown>
      {allCOlumns[allCOlumns.length - 1].getColId() === props.column.getColId() && (
        <Button
          variant="soft"
          onClick={onAddColumn}
          className="absolute -right-[133px] h-full cursor-pointer rounded-none"
        >
          <IoIosAdd size={25} /> Add Column{' '}
        </Button>
      )}
    </div>
  );
}
