import { RequestStatusType } from "../reducers/app-reducer";

export const APP_SET_STATUS = "APP-SET-STATUS";
export const APP_SET_ERROR = "APP-SET-ERROR";

export const appSetStatusAC = (status: RequestStatusType) =>
  ({ type: APP_SET_STATUS, status } as const);

export const appSetErrorAC = (error: null | string) =>
  ({ type: APP_SET_ERROR, error } as const);

// =====TYPES =====

export type AppSetStatusType = ReturnType<typeof appSetStatusAC>;
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>;

export type ActionsType = AppSetStatusType | AppSetErrorType;
