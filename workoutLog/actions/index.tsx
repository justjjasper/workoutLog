import { ACTIONS } from '../reducers/Reducers';

export const setCurrentDate = (date: Date) => {
  return {
    type: ACTIONS.SET_CURRENT_DATE,
    payload: date
  }
};

export const setPrevMonth = () => {
  return {
    type: ACTIONS.SET_PREVIOUS_MONTH
  }
};

export const setNextMonth = () => {
  return {
    type: ACTIONS.SET_NEXT_MONTH
  }
};

export const loginUsername = (username: string) => {
  return {
    type: ACTIONS.LOGIN_USER,
    payload: username
  }
}