export const CHANGE_ROLE = "CHANGE_ROLE";


interface IChangeStore {
  role: string;
  login: string;
}

export const changeStore = (data: IChangeStore) => ({
  type: CHANGE_ROLE,
  role: data.role,
  login: data.login
} as const);
