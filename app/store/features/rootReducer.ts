import { combineReducers } from '@reduxjs/toolkit';
import sideBarBasesTablesReducer from './sideBarBasesTables';
import dialogReducer from './dialog';
import mainReducer from './mainState';
import tableStateReducer from './tableState';

const rootReducer = combineReducers({
  // [mainApi.reducerPath]: mainApi.reducer,
  sidebar: sideBarBasesTablesReducer,
  dialog: dialogReducer,
  main: mainReducer,
  table: tableStateReducer,
});

export default rootReducer;
