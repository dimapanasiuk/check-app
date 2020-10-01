import { CHANGE_ROLE } from "../../actions/LoginActions/roleAction";
import { ActionLoginType } from "../../actions/LoginActions/types";

const initialState = { role: "", login: "" };

export type TState = {
  role: string;
  login: string;
};

const counterReducer = (
  state: TState = initialState,
  action: ActionLoginType
): TState => {
  switch (action.type) {
    case CHANGE_ROLE:
      return { role: action.role, login: action.login };
    default:
      return { ...state };
  }
};

export default counterReducer;
