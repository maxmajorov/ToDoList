import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../api/api";
import { RootStateType } from "../store";
import { setIsLoggedInAC } from "./auth-reducer";

const initialState = {
  status: "idle",
  error: null as null | string,
  isInitialized: false,
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatusAC(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {
      state.status = action.payload.status;
    },

    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },

    setAppInitializedAC(
      state,
      action: PayloadAction<{ isInitialized: boolean }>
    ) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;

export const { setAppErrorAC, setAppStatusAC, setAppInitializedAC } =
  slice.actions;

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .authMe()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
      } else {
      }
    })
    .finally(() => {
      dispatch(setAppInitializedAC({ isInitialized: true }));
    });
};

// ==== SELECTORS ====

export const appInitializeSelector = (state: RootStateType) =>
  state.app.isInitialized;

export const appStatusSelector = (state: RootStateType) => state.app.status;

export const appErrorSelector = (state: RootStateType) => state.app.error;

//==== TYPES ====

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
// export type InitialStateType = {
//   status: RequestStatusType;
//   error: string | null;
//   isInitialized: boolean;
// };
