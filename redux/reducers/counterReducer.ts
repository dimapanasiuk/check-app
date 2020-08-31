import {
  DECREMENT_COUNTER,
  INCREMENT_COUNTER,
} from "../actions/counterActions";

const initialState = { value: 0 };

export type TState = typeof initialState;

const counterReducer = (state: TState = initialState, action: any) => {
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
