import { RequestStatusType } from "../reducers/app-reducer";
import { AuthMeType, LoginType, LogoutType } from "./auth-actions";

export const INITIALIZE_APP = "INITIALIZE-APP";
export const APP_SET_STATUS = "APP-SET-STATUS";
export const APP_SET_ERROR = "APP-SET-ERROR";

export const initializeAppAC = () => ({ type: INITIALIZE_APP } as const);

export const appSetStatusAC = (status: RequestStatusType) =>
  ({ type: APP_SET_STATUS, status } as const);

export const appSetErrorAC = (error: null | string) =>
  ({ type: APP_SET_ERROR, error } as const);

// =====TYPES =====

export type InitializeAppType = ReturnType<typeof initializeAppAC>;
export type AppSetStatusType = ReturnType<typeof appSetStatusAC>;
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>;

export type ActionsType =
  | InitializeAppType
  | AppSetStatusType
  | AppSetErrorType
  | AuthMeType
  | LoginType
  | LogoutType;
