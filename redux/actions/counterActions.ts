import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from "../constants/counterConstants";

export const incrementCounter = () =>
  ({
    type: INCREMENT_COUNTER,
  } as const);

export const decrementCounter = () =>
  ({
    type: DECREMENT_COUNTER,
  } as const);
