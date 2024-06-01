'use client';
import HeaderToolsController from '@/components/layout/table/HeaderToolsController';
import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Page() {
  const [isViewActive, setIsViewActive] = useState(false);

  return (
    <>
      <HeaderToolsController isViewActive={isViewActive} setIsViewActive={setIsViewActive} />
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
          <Panel
            order={2}
            id="table-panel"
            className="flex h-full flex-1 items-center justify-center bg-accent-a1"
          >
            main table Components
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
}
