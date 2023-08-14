import { combineReducers } from 'redux';
import { currentDateReducer, loginReducer, modalReducer, activitiesReducer, homeHeaderStatusReducer, authenticateReducer } from './Reducers';

export const rootReducer = combineReducers({
  currentDate: currentDateReducer,
  emailAddress: loginReducer,
  toggleModal: modalReducer,
  activities: activitiesReducer,
  homeHeaderStatus: homeHeaderStatusReducer,
  toggleLogin: authenticateReducer
});