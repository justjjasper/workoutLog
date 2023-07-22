import { ActionSheetIOS } from 'react-native';
import { AnyAction } from 'redux';
import { Activity } from '../types';

export const ACTIONS = {
  SET_CURRENT_DATE: 'Set the current date',
  SET_PREVIOUS_MONTH: 'Changes to previous month',
  SET_NEXT_MONTH: 'Changes to next month',
  LOGIN_EMAILADDRESS: 'Sets login email address',
  TOGGLE_MODAL: 'Toggles modal state',
  SET_ACTIVITIES: 'Set Activities Data',
  TOGGLE_HOME_HEADER: 'Toggles home header state',
  POST_ACTIVITY: 'Creates a new Activity Name or Activity Info',
  DELETE_ACTIVITY: 'Deletes activities'
};

interface CurrentDateState {
  currentDate: Date;
  currentMonth: number
};

const dateInitialState: CurrentDateState = {
  currentDate: new Date(),
  currentMonth: new Date().getMonth()
};

export const currentDateReducer = (state: CurrentDateState = dateInitialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
        currentMonth: action.payload
      }
      case ACTIONS.SET_PREVIOUS_MONTH:
        const prevMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1);
        return {
          ...state,
          currentDate: prevMonth,
          currentMonth: prevMonth.getMonth()
        }
      case ACTIONS.SET_NEXT_MONTH:
        const nextMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1);
        return {
          ...state,
          currentDate: nextMonth,
          currentMonth: nextMonth.getMonth()
        }
      default:
        return state;
  }
};

interface LoginInitialState {
  emailAddress: string | null
};

// Eventually have to implement an empty username during prototype app launch
const loginInitialState: LoginInitialState = {
  emailAddress: 'johndoe@example.com'
};

export const loginReducer = (state: LoginInitialState = loginInitialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.LOGIN_EMAILADDRESS:
      return {
        ...state,
        emailAddress: action.payload
      }
    default:
      return state;
  }
};

export const modalReducer = (state: boolean = false, action: AnyAction) => {
  switch(action.type) {
    case ACTIONS.TOGGLE_MODAL:
      return !state
    default:
      return state
  }
};

interface ActiivtiesState {
  activities: Activity[]
};

const initialActivitiesState = {
  activities: []
};

export const activitiesReducer = (state: ActiivtiesState = initialActivitiesState, action: AnyAction) => {
  switch(action.type) {
    case ACTIONS.SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      }
    case ACTIONS.POST_ACTIVITY:
      const { activityId, activityName, activityInfo, day, month, year } = action.payload;

      // Find the activity with the same activityId
      const existingActivity = state.activities.find(activity => activity.activityId === activityId);

      if (!existingActivity) {
        // Add a new activityName
        const newActivity: Activity = {
          activityName,
          activityInfo: null,
          day,
          month,
          year,
          activityId,
        };

        return {
          ...state,
          activities: [...state.activities, newActivity],
        };
      } else if (!existingActivity.activityInfo && activityInfo) {
        // Update activityInfo for an existing activity, when activityInfo is null
        return {
          ...state,
          activities: state.activities.map((activity: Activity) => {
            if (activity.activityId === activityId) {
              return {
                ...activity,
                activityInfo,
              };
            }
            return activity;
          }),
        };
      } else {
        // Update activityInfo for an existing activity, when activityInfo is not null
        return {
          ...state,
          activities: state.activities.map((activity: Activity) => {
            if (activity.activityId === activityId) {
              return {
                ...activity,
                activityInfo,
              };
            }
            return activity;
          }),
        };
      }
    case ACTIONS.DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter((activity: Activity) => !action.payload.includes(activity.activityId))
      }
    default:
      return state
  }
};

export const homeHeaderStatusReducer = (state: boolean = true, action: AnyAction) => {
  switch(action.type) {
    case ACTIONS.TOGGLE_HOME_HEADER:
      return !state
    default:
      return state
  }
};

