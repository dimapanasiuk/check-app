import roleReducer from './roleReducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chooseRole: roleReducer,
});

export default rootReducer;
