import { InitializeAppType } from "./app-actions";

export const AUTH_ME = "AUTH-ME";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const authMeAC = () => ({ type: AUTH_ME } as const);

export const loginAC = () => ({ type: LOGIN } as const);

export const logoutAC = () => ({ type: LOGOUT } as const);

// =====TYPES =====

export type AuthMeType = ReturnType<typeof authMeAC>;
export type LoginType = ReturnType<typeof loginAC>;
export type LogoutType = ReturnType<typeof logoutAC>;

export type ActionsType =
  | AuthMeType
  | LoginType
  | LogoutType
  | InitializeAppType;
