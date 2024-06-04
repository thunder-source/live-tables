/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact, getInstance } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef, GridReadyEvent, StatusPanelDef } from 'ag-grid-community';
import StatusPanel from './statusPanel/StatusPanel';
import { IStatusPanel } from 'ag-grid-community';
import 'ag-grid-enterprise';
import PrimarySelectCell from './cells/PrimarySelectCell';
import CustomHeader from './columns/CustomHeader';
import { generateColumnId } from '@/utils';

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
    rowHeight: number;
    gridRef: React.RefObject<AgGridReact<any>>;
};
export interface columnDef extends ColDef {
    columnType?: string;
}

export default function MainTable({ rowHeight, gridRef }: props) {
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

    const [columnDefs, setColumnDefs] = useState<columnDef[]>([
        {
            lockPosition: 'left',
            valueGetter: `node.rowIndex + 1`,
            colId: 'primaryColumn',
            columnType: 'text',
            cellClass: 'locked-col',
            width: 100,
            pinned: true,
            resizable: false,
            filter: false,
            suppressNavigable: true,
            // headerComponent: (props: CustomHeaderProps) => <CustomHeader props={props} setColumnDefs={setColumnDefs} columnDefs={columnDefs} />,
            // headerComponentParams: { api },
            lockPinned: true,
            // resizable: false,
            // rowDrag: true,
            // checkboxSelection: true,
            // headerCheckboxSelection: true,
            cellRenderer: PrimarySelectCell,
            cellStyle: { padding: '0', outline: 'none' },
        },
        // {
        //     lockPosition: 'left',
        //     columnType: 'text',
        //     field: 'Name',
        //     colId: generateColumnId(),
        //     cellClass: 'locked-col',
        //     width: 120,
        //     editable: true,
        //     pinned: true,
        //     suppressNavigable: true,
        //     lockPinned: true,
        //     // resizable: false,
        // },
        // {
        //     field: 'Notes',
        //     columnType: 'text',
        //     colId: generateColumnId(),
        //     width: 120,
        //     editable: true,
        // },
        { field: 'athlete', editable: true, columnType: 'text', },
        { field: 'country', editable: true, columnType: 'text', },
        { field: 'year', editable: true, columnType: 'text', },
        { field: 'date', editable: true, columnType: 'text', },
        { field: 'sport', editable: true, columnType: 'text', },
        { field: 'gold', editable: true, columnType: 'text', },
        { field: 'silver', editable: true, columnType: 'text', },
        { field: 'bronze', editable: true, columnType: 'text', },
        { field: 'total', editable: true, columnType: 'text', },
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

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then((resp) => resp.json())
            .then((data: IOlympicData[]) => {
                console.log(data)
                setRowData(data)
            });
    }, []);

    // const toggleStatusBarComp = useCallback(() => {
    //     getInstance(
    //         gridRef.current!.api.getStatusPanel<IClickableStatusBar>('statusBarCompKey')!,
    //         (statusBarComponent) => {
    //             statusBarComponent!.setVisible(!statusBarComponent!.isVisible());
    //         },
    //     );
    // }, []);

    // className = { 'ag-theme-quartz'}

    const components = useMemo<{
        [p: string]: any;
    }>(() => {
        return {
            agColumnHeader: CustomHeader,
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={{ height: '100%', boxSizing: 'border-box' }}>
                <div style={gridStyle} className={'ag-theme-quartz'}>
                    <AgGridReact<any>
                        rowHeight={rowHeight}
                        components={components}
                        ref={gridRef}
                        defaultColDef={defaultColDef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        rowSelection="multiple"
                        suppressRowClickSelection
                        statusBar={statusBar}
                        reactiveCustomComponents
                        rowDragManaged={true}
                        suppressMoveWhenRowDragging={true}
                        rowDragEntireRow={true}
                        enableRangeSelection={true}
                        enableFillHandle={true}
                        enableAdvancedFilter={true}

                        onColumnEverythingChanged={() => {
                            // setIsUpdated(!isUpdated);
                            // gridRef.current?.api.refreshCells()
                            // gridRef.current?.api.redrawRows()
                            // console.log(statusBar.statusPanels);
                        }}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
        </div>
    );
}
