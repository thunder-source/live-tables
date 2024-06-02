/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact, getInstance } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    StatusPanelDef,
    createGrid,
} from 'ag-grid-community';
import { IoIosArrowDown } from 'react-icons/io';
import StatusPanel from './statusPanel/StatusPanel';
import { IStatusPanel } from 'ag-grid-community';
import 'ag-grid-enterprise';
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
};

export default function MainTable({ rowHeight }: props) {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [isUpdated, setIsUpdated] = useState(false);
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
            cellClass: 'locked-col',
            width: 100,
            pinned: true,
            suppressNavigable: true,
            lockPinned: true,
            resizable: false,
            checkboxSelection: true,
            headerCheckboxSelection: true,
        },
        {
            lockPosition: 'left',
            field: 'Name',
            cellClass: 'locked-col',
            width: 120,
            editable: true,
            pinned: true,
            suppressNavigable: true,
            lockPinned: true,
            resizable: false,
        },
        { field: 'athlete', editable: true },
        { field: 'sport' },
        { field: 'age' },
        { field: 'date', editable: true },
        {
            field: 'Add Table',

            onCellClicked: (e) => {
                console.log(e);
            },
        },
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

    const toggleStatusBarComp = useCallback(() => {
        getInstance(
            gridRef.current!.api.getStatusPanel<IClickableStatusBar>('statusBarCompKey')!,
            (statusBarComponent) => {
                statusBarComponent!.setVisible(!statusBarComponent!.isVisible());
            },
        );
    }, []);

    return (
        <div style={containerStyle}>
            <div style={{ height: '100%', boxSizing: 'border-box' }}>
                <div style={gridStyle} className={'ag-theme-quartz'}>
                    <AgGridReact<IOlympicData>
                        rowHeight={rowHeight}
                        ref={gridRef}
                        defaultColDef={defaultColDef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        rowSelection="multiple"
                        suppressRowClickSelection
                        statusBar={statusBar}
                        reactiveCustomComponents
                        onColumnEverythingChanged={() => {
                            // setIsUpdated(!isUpdated);
                            console.log(statusBar.statusPanels);
                        }}
                    // onGridReady={onGridReady}
                    />
                </div>
            </div>
        </div>
    );
}
