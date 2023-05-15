import { combineReducers } from 'redux';
import { currentDateReducer, loginReducer, modalReducer, activitiesReducer } from './Reducers';

export const rootReducer = combineReducers({
  currentDate: currentDateReducer,
  username: loginReducer,
  toggleModal: modalReducer,
  activities: activitiesReducer
})