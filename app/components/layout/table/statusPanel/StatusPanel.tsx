import StatusPanelDropDown from '@/components/dropdown/StatusPanelDropDown';
import { CustomStatusPanelProps } from 'ag-grid-react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';


export default function StatusPanel(props: CustomStatusPanelProps) {
  const [count, setCount] = useState(0);
  const [activeColumns, setActiveColumns] = useState<any>([]);

  useEffect(() => {
    setCount(props.api.getDisplayedRowCount());
    setActiveColumns(props.api.getAllDisplayedColumns());
  }, [props.api]);

  console.log(props.api);
  return (
    <div className="flex h-8 items-start p-1">
      <span className="w-[100px] text-xs text-accent-12">{count} Records</span>
      {activeColumns ? (
        activeColumns.map((column: any, index: number) => {
          return <StatusPanelColumnRenderer key={index} column={column} />;
        })
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

const StatusPanelColumnRenderer = ({ column }: { column: any }) => {
  if (column.instanceId === 0) {
    return;
  }
  return (
    <div
      style={{ maxWidth: column.actualWidth, width: column.actualWidth - 1 }}
      className="group text-right text-xs"
    >
      <StatusPanelDropDown>
        <span className={clsx('mr-2')}>{column.colDef.field}</span>
      </StatusPanelDropDown>
    </div>
  );
};
