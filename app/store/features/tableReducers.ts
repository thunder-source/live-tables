import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigState, TableConfig } from '@/types';

export const createTable = (
  state: ConfigState,
  action: PayloadAction<{ baseId: string; table: TableConfig }>,
) => {
  const { baseId, table } = action.payload;
  if (state.bases[baseId]) {
    state.bases[baseId].tables[table.id] = table;
    state.bases[baseId].tableOrder.push(table.id);
  }
};

export const updateTable = (
  state: ConfigState,
  action: PayloadAction<{ baseId: string; table: TableConfig }>,
) => {
  const { baseId, table } = action.payload;
  if (state.bases[baseId] && state.bases[baseId].tables[table.id]) {
    state.bases[baseId].tables[table.id] = table;
  }
};

export const deleteTable = (
  state: ConfigState,
  action: PayloadAction<{ baseId: string; tableId: string }>,
) => {
  const { baseId, tableId } = action.payload;
  if (state.bases[baseId]) {
    delete state.bases[baseId].tables[tableId];
    state.bases[baseId].tableOrder = state.bases[baseId].tableOrder.filter((id) => id !== tableId);
  }
};

export const updateTableOrder = (
  state: ConfigState,
  action: PayloadAction<{ baseId: string; tableOrder: string[] }>,
) => {
  const { baseId, tableOrder } = action.payload;
  if (state.bases[baseId]) {
    state.bases[baseId].tableOrder = tableOrder;
  }
};
