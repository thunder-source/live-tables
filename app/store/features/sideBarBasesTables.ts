import { createSlice } from '@reduxjs/toolkit';
import { ConfigState } from '@/types';
import * as baseReducers from './baseReducers';
import * as tableReducers from './tableReducers';

const initialState: ConfigState = {
  bases: {},
  baseOrder: [],
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    ...baseReducers,
    ...tableReducers,
  },
});

export const {
  createBase,
  updateBase,
  updateBaseDetails,
  deleteBase,
  createTable,
  updateTable,
  deleteTable,
  updateBaseOrder,
  updateTableOrder,
} = configSlice.actions;
export default configSlice.reducer;
