import { AnyAction } from 'redux';

export const ACTIONS = {
  SET_CURRENT_DATE: 'Set the current date',
  SET_PREVIOUS_MONTH: 'Changes to previous month',
  SET_NEXT_MONTH: 'Changes to next month',
  LOGIN_USER: 'Sets login username'
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

interface loginInitialState {
  username: string | null
};

const loginInitialState: loginInitialState = {
  username: 'johndoe'
};

export const loginReducer = (state: loginInitialState = loginInitialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.LOGIN_USER:
      return {
        ...state,
        username: action.payload
      }
      default:
        return state;
  }
}