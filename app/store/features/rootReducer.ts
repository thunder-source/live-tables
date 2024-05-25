import { combineReducers } from '@reduxjs/toolkit';
import sideBarBasesTablesReducer from './sideBarBasesTables';
// import { mainApi } from '../services/main';

const rootReducer = combineReducers({
  // [mainApi.reducerPath]: mainApi.reducer,
  sidebar: sideBarBasesTablesReducer,
});

export default rootReducer;
