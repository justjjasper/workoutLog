import { ACTIONS } from '../reducers/Reducers';
import { Activity } from '../types';

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
};

export const toggleModal = () => {
  return {
    type: ACTIONS.TOGGLE_MODAL
  }
};

interface SetActivitiesAction {
  type: typeof ACTIONS.SET_ACTIVITIES
  payload: Activity[]
};

export const setActivities = (activities: Activity[]): SetActivitiesAction => ({
  type: ACTIONS.SET_ACTIVITIES,
  payload: activities
});

export const postActivityName = (activities: Activity) => ({
  type: ACTIONS.POST_ACTIVITY,
  payload: activities
});

export const toggleHomeHeader = () => {
  return {
    type: ACTIONS.TOGGLE_HOME_HEADER
  }
};