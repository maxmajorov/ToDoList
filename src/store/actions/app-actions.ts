import { RequestStatusType } from "../reducers/app-reducer";

export const APP_SET_STATUS = "APP-SET-STATUS";

export const appSetStatusAC = (status: RequestStatusType) =>
  ({ type: APP_SET_STATUS, status } as const);

export type AppSetStatus = ReturnType<typeof appSetStatusAC>;

export type ActionsType = AppSetStatus;
