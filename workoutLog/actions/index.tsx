import { ACTIONS } from '../reducers/Reducers';

export const setCurrentDate = (date: Date) => {
  return {
    type: ACTIONS.SETCURRENTDATE,
    payload: date
  }
}