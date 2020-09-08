import roleReducer from "./roleReducer";
import pullReqReducer from "./pullReqReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chooseRole: roleReducer,
  requests: pullReqReducer,
});

export default rootReducer;
