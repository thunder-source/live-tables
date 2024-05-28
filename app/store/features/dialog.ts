
import { BaseConfig, TableConfig } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
export interface DialogState {
  isOpen: boolean;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | null; // Type of action being performed
  entityType: 'TABLE' | 'BASE' | null; // Type of entity being operated on
  entityId: string | null; // ID of the entity being operated on
  additionalOptions: {
    tableOrder?: string[];
    name?: string;
    tables?: { [key: string]: TableConfig };
    baseId?: string
    tableConfig?: TableConfig
    baseConfig?: BaseConfig
  } | null; // ID of the entity being operated on
}

// Initial state
const initialState: DialogState = {
  isOpen: false,
  actionType: null,
  entityType: null,
  entityId: null,
  additionalOptions: null,
};

// Create a slice
const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{
        actionType: DialogState['actionType'];
        entityType: DialogState['entityType'];
        entityId: DialogState['entityId'];
        additionalOptions?: DialogState['additionalOptions'];
      }>,
    ) => {
      state.isOpen = true;
      state.actionType = action.payload.actionType;
      state.entityType = action.payload.entityType;
      state.entityId = action.payload.entityId;
      state.additionalOptions = action.payload?.additionalOptions ?? null;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.actionType = null;
      state.entityType = null;
      state.entityId = null;
    },
  },
});

// Export actions
export const { openDialog, closeDialog } = dialogSlice.actions;

// Export reducer
export default dialogSlice.reducer;
