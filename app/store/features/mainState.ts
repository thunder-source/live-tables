import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type sidebarTypes = {
  isSideBarOpen: boolean;
  sidebarActiveWidth: number;
};

type initialStateProps = {
  sidebar: sidebarTypes;
};

const initialState: initialStateProps = {
  sidebar: {
    isSideBarOpen: true,
    sidebarActiveWidth: 250,
  },
};

const mainState = createSlice({
  name: 'mainState',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.sidebar.isSideBarOpen = !state.sidebar.isSideBarOpen;
    },
    setSidebarState: (
      state,
      action: PayloadAction<{ isSideBarOpen: boolean; sidebarActiveWidth: number }>,
    ) => {
      state.sidebar.isSideBarOpen = action.payload.isSideBarOpen;
      state.sidebar.sidebarActiveWidth = action.payload.sidebarActiveWidth;
    },
  },
});

export const { toggleSideBar, setSidebarState } = mainState.actions;

export default mainState.reducer;
