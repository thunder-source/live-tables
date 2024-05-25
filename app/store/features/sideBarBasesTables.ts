import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigState, BaseConfig, TableConfig } from '@/types';

const initialState: ConfigState = {
  bases: {},
  baseOrder: [],
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    addBase: (state, action: PayloadAction<BaseConfig>) => {
      const base = action.payload;
      state.bases[base.id] = base;
      state.baseOrder.push(base.id);
    },
    updateBase: (state, action: PayloadAction<BaseConfig>) => {
      const base = action.payload;
      if (state.bases[base.id]) {
        state.bases[base.id] = base;
      }
    },
    deleteBase: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.bases[id];
      state.baseOrder = state.baseOrder.filter((baseId) => baseId !== id);
    },
    addTable: (state, action: PayloadAction<{ baseId: string; table: TableConfig }>) => {
      const { baseId, table } = action.payload;
      if (state.bases[baseId]) {
        state.bases[baseId].tables[table.id] = table;
        state.bases[baseId]?.tableOrder.push(table.id);
      }
    },
    updateTable: (state, action: PayloadAction<{ baseId: string; table: TableConfig }>) => {
      const { baseId, table } = action.payload;
      if (state.bases[baseId] && state.bases[baseId].tables[table.id]) {
        state.bases[baseId].tables[table.id] = table;
      }
    },
    deleteTable: (state, action: PayloadAction<{ baseId: string; tableId: string }>) => {
      const { baseId, tableId } = action.payload;
      if (state.bases[baseId]) {
        delete state.bases[baseId].tables[tableId];
        state.bases[baseId].tableOrder = state.bases[baseId].tableOrder.filter(
          (id) => id !== tableId,
        );
      }
    },
    updateBaseOrder: (state, action: PayloadAction<string[]>) => {
      state.baseOrder = action.payload;
    },
    updateTableOrder: (state, action: PayloadAction<{ baseId: string; tableOrder: string[] }>) => {
      const { baseId, tableOrder } = action.payload;
      if (state.bases[baseId]) {
        state.bases[baseId].tableOrder = tableOrder;
      }
    },
  },
});

export const {
  addBase,
  updateBase,
  deleteBase,
  addTable,
  updateTable,
  deleteTable,
  updateBaseOrder,
  updateTableOrder,
} = configSlice.actions;
export default configSlice.reducer;
