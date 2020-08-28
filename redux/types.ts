import * as actions from "./actions/counterActions";

type inferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type TActionTypes = ReturnType<inferValueTypes<typeof actions>>;
