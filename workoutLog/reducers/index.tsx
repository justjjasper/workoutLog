import { combineReducers } from 'redux';
import { currentDateReducer } from './Reducers';

export const rootReducer = combineReducers({
  currentDate: currentDateReducer
})