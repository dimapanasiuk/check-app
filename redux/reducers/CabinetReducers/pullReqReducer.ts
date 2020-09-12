import { CHANGE_PR } from "../../actions/CabinetActions/pullRequestAction";

const initialState = { pullRequests: [] };

export type TState = typeof initialState;

const counterReducer = (state: TState = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_PR:
      return { pullRequests: action.payload };
    default:
      return { ...state };
  }
};

export default counterReducer;
