import { combineReducers } from '@reduxjs/toolkit';
import sideBarBasesTablesReducer from './sideBarBasesTables';
import dialogReducer from './dialog';
import mainStateReducer from './mainState';
// import { mainApi } from '../services/main';

const rootReducer = combineReducers({
  // [mainApi.reducerPath]: mainApi.reducer,
  sidebar: sideBarBasesTablesReducer,
  dialog: dialogReducer,
  mainState: mainStateReducer,
});

export default rootReducer;
