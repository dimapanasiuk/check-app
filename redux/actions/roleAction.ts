export const CHANGE_ROLE = "CHANGE_ROLE";

export const changeStore = (num: number) =>
  ({
    type: CHANGE_ROLE,
    testData: num
  } as const);
