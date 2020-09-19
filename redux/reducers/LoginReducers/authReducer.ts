import { CHANGE_AUTH_STATUS } from "../../actions/LoginActions/authAction";
import { ActionAuthStatusType } from "../../actions/LoginActions/types";

const initialState = { isAuth: false };

export type TState = {
  isAuth: boolean;
};

const authReducer = (
  state: TState = initialState,
  action: ActionAuthStatusType
): TState => {
  switch (action.type) {
    case CHANGE_AUTH_STATUS:
      return { isAuth: action.payload };
    default:
      return { ...state };
  }
};

export default authReducer;
