export const CHANGE_ROLE = "CHANGE_ROLE";

export const changeStore = (role: string) =>
  ({
    type: CHANGE_ROLE,
    role: role
  } as const);
