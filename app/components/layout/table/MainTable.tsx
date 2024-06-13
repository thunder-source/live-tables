/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact, CustomHeaderProps, getInstance } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef, ICellRendererParams, StatusPanelDef } from 'ag-grid-community';
import StatusPanel from './statusPanel/StatusPanel';
import { IStatusPanel } from 'ag-grid-community';
import 'ag-grid-enterprise';
import PrimarySelectCell from './cells/PrimarySelectCell';
import CustomHeader from './columns/CustomHeader';
import { generateColumnId } from '@/utils';
import CustomGrouping from './grouping/CustomGrouping';
import { IsFullWidthRowParams } from 'ag-grid-charts-enterprise';
import HeaderToolsController from './HeaderToolsController';
import HeaderToolsControllerSkeleton from '@/components/skeleton/layout/table/HeaderToolsControllerSkeleton';
import { useAppSelector } from '@/hooks/reduxHandlers';

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface IClickableStatusBar extends IStatusPanel {
  setVisible(visible: boolean): void;
  isVisible(): boolean;
}

type props = {
  // rowHeight: number;
  gridRef: React.RefObject<AgGridReact<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainTable({ gridRef, setLoading }: props) {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>([
    {
      athlete: 'Athlete',
      age: 23,
      country: 'United States',
      year: 2012,
      date: '27/06/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 0,
      bronze: 0,
      total: 1,
    },
    {
      athlete: 'Athlete',
      age: 23,
      country: 'United States',
      year: 2012,
      date: '27/06/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 0,
      bronze: 0,
      total: 1,
    },
    {
      athlete: 'Athlete',
      age: 23,
      country: 'United States',
      year: 2012,
      date: '27/06/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 0,
      bronze: 0,
      total: 1,
    },
    {
      athlete: 'Athlete',
      age: 23,
      country: 'United States',
      year: 2012,
      date: '27/06/2012',
      sport: 'Swimming',
      gold: 1,
      silver: 0,
      bronze: 0,
      total: 1,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      width: 150,
      filter: true,
      // resizable: false,
      // suppressHeaderMenuButton: true,
      // sortable: false,
      // suppressMovable: true,
      // headerClass: 'bg-accent-a6 h-8'
    };
  }, []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      lockPosition: 'left',
      valueGetter: `node.rowIndex + 1`,
      colId: 'primaryColumn',
      field: 'SNo.',
      // ,
      // isPrimary: true,
      type: 'primary-hidden',
      cellClass: 'locked-col',
      width: 100,
      pinned: true,
      resizable: false,
      filter: false,
      hide: false,
      suppressNavigable: true,
      lockPinned: true,
      // rowDrag: true,
      // checkboxSelection: true,
      // headerCheckboxSelection: true,
      cellRenderer: PrimarySelectCell,
      cellStyle: { padding: '0', outline: 'none' },
    },
    {
      field: 'Name',
      colId: generateColumnId(),
      width: 120,
      type: 'primary',
      editable: true,
      suppressNavigable: true,
      rowGroup: false,
      cellClass: 'locked-col',
      lockPosition: 'left',
      lockPinned: true,
      pinned: true,
      // resizable: false,
    },
    // Single Group Column (Custom)
    // {
    //     // group column name
    //     headerName: 'Group',
    //     // use the group cell render provided by the grid
    //     cellRenderer: CustomGrouping,
    //     // informs the grid to display row groups under this column
    //     showRowGroup: false
    // },
    // {
    //     field: 'Notes',
    //     ,
    //     colId: generateColumnId(),
    //     width: 120,
    //     editable: true,
    // },
    { field: 'athlete', editable: true, rowGroup: false },
    { field: 'country', editable: true, },
    { field: 'year', editable: true, },
    { field: 'date', editable: true, },
    { field: 'sport', editable: true, },
    { field: 'gold', editable: true, },
    { field: 'silver', editable: true, },
    { field: 'bronze', editable: true, },
    { field: 'total', editable: true, },
    { field: 'country', editable: true, },
    { field: 'year', editable: true, },
    { field: 'date', editable: true, },
    { field: 'sport', editable: true, },
    { field: 'gold', editable: true, },
    { field: 'silver', editable: true, },
    { field: 'bronze', editable: true, },
    { field: 'total', editable: true, },
    { field: 'country', editable: true, },
    { field: 'year', editable: true, },
    { field: 'date', editable: true, },
    { field: 'sport', editable: true, },
    { field: 'gold', editable: true, },
    { field: 'silver', editable: true, },
    { field: 'bronze', editable: true, },
    { field: 'total', editable: true, },
    // {
    //     field: 'Add Column',
    //     colId: 'AddColumn',
    //     onCellClicked: (e) => {
    //         console.log(e);
    //     },
    //     // initialHide: true,
    //     cellRenderer: EmptyCell,
    //     // hide: true
    // },
  ]);

  const statusBar = useMemo<{
    statusPanels: StatusPanelDef[];
  }>(() => {
    return {
      statusPanels: [
        {
          statusPanel: StatusPanel,
          align: 'left',
          statusPanelParams: {
            aggFuncs: ['count', 'sum'],
          },
        },
      ],
    };
  }, []);

  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //     fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //         .then((resp) => resp.json())
  //         .then((data: IOlympicData[]) => {
  //             console.log(data)
  //             setRowData(data)
  //         });
  // }, []);

  // const toggleStatusBarComp = useCallback(() => {
  //     getInstance(
  //         gridRef.current!.api.getStatusPanel<IClickableStatusBar>('statusBarCompKey')!,
  //         (statusBarComponent) => {
  //             statusBarComponent!.setVisible(!statusBarComponent!.isVisible());
  //         },
  //     );
  // }, []);

  // className = { 'ag-theme-quartz'}

  const AddRowButtonRenderer: React.FC<ICellRendererParams> = (props) => {
    const addRow = () => {
      const newRow = { make: '', model: '', price: 0 };
      props.api.applyTransaction({ add: [newRow] });
    };

    return <button onClick={addRow}></button>;
  };

  const components = useMemo<{
    [p: string]: any;
  }>(() => {
    return {
      agColumnHeader: (props: CustomHeaderProps) => <CustomHeader props={props} />,

      // addRowButtonRenderer: AddRowButtonRenderer,
    };
  }, []);

  // const isFullWidthRow = useCallback((params: IsFullWidthRowParams) => {
  //     return isFullWidth(params.rowNode.data);
  // }, []);
  // const fullWidthCellRenderer = useCallback(FullWidthCellRenderer, []);

  // prevents the grid from automatically adding group columns
  const groupDisplayType = 'custom';

  return (
    <div style={containerStyle}>
      {/* {!loading ? (
        <HeaderToolsController
          gridRef={gridRef}
        />
      ) : (
        <HeaderToolsControllerSkeleton />
      )} */}
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div style={gridStyle} className={'ag-theme-quartz'}>

          <AgGridReact<any>
            ref={gridRef}
            rowHeight={32}
            // rowHeight={rowHeight}
            components={components}
            defaultColDef={defaultColDef}
            rowData={rowData}
            columnDefs={columnDefs}
            // rowSelection="multiple"
            // enableRangeSelection={true}
            // enableFillHandle={true}
            // suppressRowClickSelection
            reactiveCustomComponents
            rowDragManaged={true}
            suppressMoveWhenRowDragging={true}
            // rowDragEntireRow={true}
            enableAdvancedFilter={true}
            onGridReady={() => {
              setLoading(false);
            }}
          // columnHoverHighlight={true}
          // statusBar={statusBar}
          // fullWidthCellRenderer={fullWidthCellRenderer}
          // groupDisplayType={groupDisplayType}
          // onColumnEverythingChanged={() => {
          // setIsUpdated(!isUpdated);
          // gridRef.current?.api.refreshCells()
          // gridRef.current?.api.redrawRows()
          // console.log(statusBar.statusPanels);
          // }}
          // onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
}
