import { PayloadAction } from '@reduxjs/toolkit';
import { BaseConfig, ConfigState } from '@/types';

export const createBase = (state: ConfigState, action: PayloadAction<BaseConfig>) => {
  const base = action.payload;
  state.bases[base.id] = base;
  state.baseOrder.push(base.id);
};

export const updateBase = (state: ConfigState, action: PayloadAction<BaseConfig>) => {
  const base = action.payload;
  if (state.bases[base.id]) {
    state.bases[base.id] = base;
  }
};

export const updateBaseDetails = (
  state: ConfigState,
  action: PayloadAction<{ id: string; name: string }>,
) => {
  const { id, name } = action.payload;
  if (state.bases[id]) {
    state.bases[id].name = name;
  }
};

export const deleteBase = (state: ConfigState, action: PayloadAction<{ id: string }>) => {
  const { id } = action.payload;
  delete state.bases[id];
  state.baseOrder = state.baseOrder.filter((baseId) => baseId !== id);
};

export const updateBaseOrder = (state: ConfigState, action: PayloadAction<string[]>) => {
  state.baseOrder = action.payload;
};
