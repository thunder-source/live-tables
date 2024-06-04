'use client';
import HeaderToolsController from '@/components/layout/table/HeaderToolsController';
import MainTable from '@/components/layout/table/MainTable';
import { AgGridReact } from 'ag-grid-react';
import React, { useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Page() {
  const [isViewActive, setIsViewActive] = useState(false);
  const [rowHeight, setRowHeight] = useState<number>(32);
  const gridRef = useRef<AgGridReact>(null);

  return (
    <>
      <HeaderToolsController
        gridRef={gridRef}
        isViewActive={isViewActive}
        setIsViewActive={setIsViewActive}
        setRowHeight={setRowHeight}
        rowHeight={rowHeight}
      />
      <div className="flex w-full flex-1 bg-accent-a1">
        <PanelGroup autoSaveId="table" direction="horizontal">
          {isViewActive && (
            <>
              <Panel
                defaultSize={20}
                collapsible={true}
                order={1}
                id="view-panel"
                className="min-w-[180px] max-w-[600px] "
              >
                <div className="flex h-full items-center justify-center bg-accent-a2">
                  Views panel
                </div>
              </Panel>
              <PanelResizeHandle className="w-0.5 bg-accent-a8" />
            </>
          )}
          <Panel order={2} id="table-panel" className="h-full w-full flex-1 bg-accent-a1">
            <MainTable rowHeight={rowHeight} gridRef={gridRef} />
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
}
