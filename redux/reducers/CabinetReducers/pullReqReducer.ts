import { CHANGE_PR } from "../../actions/CabinetActions/pullRequestAction";
import { ActionCabinetType } from "../../actions/CabinetActions/types";
import { IPullRequests } from "../../../components/cabinet/interfaces/pullRequestsInterface";

const initialState = { pullRequests: [] };

export type TState = {
  pullRequests: IPullRequests[];
};

const counterReducer = (
  state: TState = initialState,
  action: ActionCabinetType
): TState => {
  switch (action.type) {
    case CHANGE_PR:
      return { pullRequests: action.payload };
    default:
      return { ...state };
  }
};

export default counterReducer;
