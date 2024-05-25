'use client';
import React from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { useCallback, useState } from 'react';
import 'ag-grid-enterprise';
import { ColumnPinnedEvent } from 'ag-grid-community';
import { ColumnState } from 'ag-grid-charts-enterprise';

// const CustomButtonComponent = (props) => {
//   // console.log(props);
//   return (
//     <Button
//       variant="surface"
//       className="my-auto mt-1 cursor-pointer"
//       onClick={() => window.alert('clicked')}
//     >
//       Push Me!
//     </Button>
//   );
// };

//

export default function Page() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<any>([
    {
      headerName: 'S/No.',
      headerCheckboxSelection: true,
      rowDrag: true,
      checkboxSelection: true,
      width: 150,
      resizable: false,
      pinned: 'left',
      lockPinned: true,
      lockPosition: 'left',
      valueGetter: 'node.rowIndex',
      cellClass: 'locked-col',
      suppressNavigable: true,
    },
    // {
    //   headerName: 'make with filter',
    //   field: 'make',
    //   filter: true,
    //   floatingFilter: true,
    // },
    // {
    //   field: 'model',
    //   editable: true,
    //   cellEditor: 'agSelectCellEditor',
    //   cellEditorParams: {
    //     values: ['Tesla', 'Ford', 'Toyota'],
    //   },
    // },
    { field: 'athlete' },
    { field: 'age' },
    {
      field: 'country',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {},
    },
    { field: 'year', editable: true, enableCellChangeFlash: true },
    { field: 'date', editable: true, enableCellChangeFlash: true },
    { field: 'sport', editable: true, enableCellChangeFlash: true },
    { field: 'gold', editable: true, enableCellChangeFlash: true },
    { field: 'silver', editable: true, enableCellChangeFlash: true },
    { field: 'bronze', editable: true, enableCellChangeFlash: true },
    { field: 'total', editable: true, enableCellChangeFlash: true },
  ]);
  //params: GridReadyEvent
  const onGridReady = useCallback(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onColumnPinned = useCallback((event: ColumnPinnedEvent) => {
    const allCols = event.api.getAllGridColumns();
    const allFixedCols = allCols.filter((col) => col.getColDef().lockPosition);
    const allNonFixedCols = allCols.filter((col) => !col.getColDef().lockPosition);
    const pinnedCount = allNonFixedCols.filter((col) => col.getPinned() === 'left').length;
    const pinFixed = pinnedCount > 0;
    const columnStates: ColumnState[] = [];
    allFixedCols.forEach((col) => {
      if (pinFixed !== col.isPinned()) {
        columnStates.push({
          colId: col.getId(),
          pinned: pinFixed ? 'left' : null,
        });
      }
    });
    // if (columnStates.length > 0) {
    //   event.api.applyColumnState({ state: columnStates });
    // }
  }, []);

  const undoRedoCellEditing = true;
  const undoRedoCellEditingLimit = 20;
  // Container: Defines the grid's theme & dimensions.
  // return <GridExample />;
  return (
    <div
      className={'ag-theme-quartz-dark'} // applying the grid theme
      style={{ height: '100vh', width: '100%' }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        enableAdvancedFilter={true}
        rowDragManaged={true}
        suppressMoveWhenRowDragging={true}
        rowSelection={'multiple'}
        rowDragMultiRow={true}
        suppressRowClickSelection={true}
        suppressDragLeaveHidesColumns={true}
        onGridReady={onGridReady}
        onColumnPinned={onColumnPinned}
        undoRedoCellEditing={undoRedoCellEditing}
        undoRedoCellEditingLimit={undoRedoCellEditingLimit}
      />
    </div>
  );
}
