import { IPullRequests } from "../../../components/cabinet/interfaces/pullRequestsInterface";

export const CHANGE_PR = "CHANGE_PR";

export const changePullRequest = (data: IPullRequests[]) =>
  ({
    type: CHANGE_PR,
    payload: data,
  } as const);
