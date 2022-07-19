import { Dispatch } from "redux";
import { authAPI } from "../../api/api";
import { AppThunk, RootStateType } from "../store";
import { setIsLoggedInAC } from "./auth-reducer";

const initialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-IS-INITIALIED":
      return { ...state, isInitialized: action.value };
    default:
      return { ...state };
  }
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export const setAppErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);
export const setAppInitializedAC = (value: boolean) =>
  ({ type: "APP/SET-IS-INITIALIED", value } as const);

export const initializeAppTC = (): AppThunk => (dispatch) => {
  authAPI.authMe().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    } else {
    }

    dispatch(setAppInitializedAC(true));
  });
};

// ==== SELECTORS ====

export const appInitializeSelector = (state: RootStateType) =>
  state.app.isInitialized;

export const appStatusSelector = (state: RootStateType) => state.app.status;

export const appErrorSelector = (state: RootStateType) => state.app.error;

//==== TYPES ====

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;

export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | ReturnType<typeof setAppInitializedAC>;
