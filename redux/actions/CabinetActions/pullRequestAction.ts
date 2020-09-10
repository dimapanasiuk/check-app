export const CHANGE_PR = "CHANGE_PR";


interface IChangePullReq {
  pullRequests: any
}

export const changePullRequest = (data: IChangePullReq) => ({
  type: CHANGE_PR,
  payload: data,
} as const);