import { AnyAction } from 'redux';

export const ACTIONS = {
  SETCURRENTDATE: 'Set the current date'
};

interface CurrentDateState {
  currentDate: Date;
};

const initialState: CurrentDateState = {
  currentDate: new Date()
};

export const currentDateReducer = (state: CurrentDateState = initialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SETCURRENTDATE:
      return {
        ...state,
        currentDate: action.payload
      }
      default:
        return state;
  }
}