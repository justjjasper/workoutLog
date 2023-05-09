import { ACTIONS } from '../reducers/Reducers';

export const setCurrentDate = (date: Date) => {
  return {
    type: ACTIONS.SETCURRENTDATE,
    payload: date
  }
};

export const setPrevMonth = () => {
  return {
    type: ACTIONS.SETPREVIOUSMONTH
  }
};

export const setNextMonth = () => {
  return {
    type: ACTIONS.SETNEXTMONTH
  }
}