import { combineReducers } from 'redux';
import { currentDateReducer, loginReducer } from './Reducers';

export const rootReducer = combineReducers({
  currentDate: currentDateReducer,
  username: loginReducer
})