import roleReducer from "./LoginReducers/roleReducer";
import pullReqReducer from "./CabinetReducers/pullReqReducer";
import authReducer from "./LoginReducers/authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chooseRole: roleReducer,
  requests: pullReqReducer,
  changeAuthStatus: authReducer,
});

export default rootReducer;
