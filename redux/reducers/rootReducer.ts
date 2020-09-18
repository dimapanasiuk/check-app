import roleReducer from "./LoginReducers/roleReducer";
import pullReqReducer from "./CabinetReducers/pullReqReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chooseRole: roleReducer,
  requests: pullReqReducer,
});

export default rootReducer;
