import counterReducer from "./counterReducer";
import roleReducer from './roleReducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter1: counterReducer,
  counter2: roleReducer,
});

export default rootReducer;
