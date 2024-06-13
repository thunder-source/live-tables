import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ViewsState {
    isOpen: boolean;
    width: number;
}

interface TableState {
    views: ViewsState;
}

const initialState: TableState = {
    views: {
        isOpen: false,
        width: 200
    }
}

const tableState = createSlice({
    name: 'table',
    initialState,
    reducers: {
        toggleView(state) {
            state.views.isOpen = !state.views.isOpen;
        },
        setWidth(state, action: PayloadAction<number>) {
            state.views.width = action.payload;
        }
    }
});

// Exporting the actions so they can be dispatched
export const { toggleView, setWidth } = tableState.actions

export default tableState.reducer
