import counterReducer from "./counterReducer";
import roleReducer from './roleReducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter: counterReducer,
  chooseRole: roleReducer,
});

export default rootReducer;
