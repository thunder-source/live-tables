import { combineReducers } from '@reduxjs/toolkit';
import sideBarBasesTablesReducer from './sideBarBasesTables';
import dialogReducer from './dialog';
// import { mainApi } from '../services/main';

const rootReducer = combineReducers({
  // [mainApi.reducerPath]: mainApi.reducer,
  sidebar: sideBarBasesTablesReducer,
  dialog: dialogReducer,
});

export default rootReducer;
