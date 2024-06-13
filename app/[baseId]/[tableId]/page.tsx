'use client';
import HeaderToolsController from '@/components/layout/table/HeaderToolsController';
import MainTable from '@/components/layout/table/MainTable';
import HeaderToolsControllerSkeleton from '@/components/skeleton/layout/table/HeaderToolsControllerSkeleton';
import { useAppSelector } from '@/hooks/reduxHandlers';
import { AgGridReact } from 'ag-grid-react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Page() {
  const views = useAppSelector(state => state.table.views)
  const gridRef = useRef<AgGridReact>(null);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="flex flex-col w-full flex-1 bg-accent-a1">
        {!loading ? (
          <HeaderToolsController
            gridRef={gridRef}
          />
        ) : (
          <HeaderToolsControllerSkeleton />
        )}
        <PanelGroup autoSaveId="table" direction="horizontal">
          {views.isOpen && (
            <>
              <Panel
                defaultSize={20}
                collapsible={true}
                order={1}
                id="view-panel"
                className={clsx('min-w-[180px] max-w-[600px]', `w-[${views.width}]`)}
              >
                <div className="flex h-full items-center justify-center bg-accent-a2">
                  Views panel
                </div>
              </Panel>
              <PanelResizeHandle className="w-0.5 bg-accent-a8" />
            </>
          )}
          <Panel order={2} id="table-panel" className="h-full w-full flex-1 bg-accent-a1">
            <MainTable setLoading={setLoading} gridRef={gridRef} />
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
}
