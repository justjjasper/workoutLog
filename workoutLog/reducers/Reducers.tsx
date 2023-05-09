import { AnyAction } from 'redux';

export const ACTIONS = {
  SETCURRENTDATE: 'Set the current date',
  SETPREVIOUSMONTH: 'Changes to previous month',
  SETNEXTMONTH: 'Changes to next month'
};

interface CurrentDateState {
  currentDate: Date;
  currentMonth: number
};

const initialState: CurrentDateState = {
  currentDate: new Date(),
  currentMonth: new Date().getMonth()
};

export const currentDateReducer = (state: CurrentDateState = initialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SETCURRENTDATE:
      return {
        ...state,
        currentDate: action.payload,
        currentMonth: action.payload
      }
      case ACTIONS.SETPREVIOUSMONTH:
        const prevMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1);
        return {
          ...state,
          currentDate: prevMonth,
          currentMonth: prevMonth.getMonth()
        }
      case ACTIONS.SETNEXTMONTH:
        const nextMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1);
        return {
          ...state,
          currentDate: nextMonth,
          currentMonth: nextMonth.getMonth()
        }
      default:
        return state;
  }
}