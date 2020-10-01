export const CHANGE_AUTH_STATUS = "CHANGE_AUTH_STATUS";


export const changeAuthStatus = (payload: boolean) => ({
  type: CHANGE_AUTH_STATUS,
  payload
} as const);
