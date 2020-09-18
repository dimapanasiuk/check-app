import { changeStore } from "./roleAction";
import { changeAuthStatus } from "./authAction";

export type ActionLoginType = ReturnType<typeof changeStore>;
export type ActionAuthStatusType = ReturnType<typeof changeAuthStatus>;
