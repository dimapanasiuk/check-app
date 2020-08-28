import {
  DECREMENT_COUNTER,
  INCREMENT_COUNTER,
} from "../constants/counterConstants";

import { TActionTypes } from "../types";

const initialState = { value: 0 };

export type TState = typeof initialState;

const counterReducer = (state: TState = initialState, action: TActionTypes) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, value: state.value + 1 };
    case DECREMENT_COUNTER:
      return { ...state, value: state.value - 1 };
    default:
      return { ...state };
  }
};

export default counterReducer;
