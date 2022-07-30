import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authAPI, LoginParamsType } from "../../api/api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

interface ValidationErrors {
  errors: Array<string>;
  fieldsErrors: Array<string>;
}

export const loginTC = createAsyncThunk<
  { isLoggedIn: boolean },
  LoginParamsType,
  {
    rejectValue: ValidationErrors;
  }
>("authorization/login", async (data, thunkAPI) => {
  const response = await authAPI.login(data);

  try {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    if (response.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
      return { isLoggedIn: true };
    } else {
      handleServerAppError(response.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
        fieldsErrors: response.data.fieldsErrors,
      });
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    handleServerNetworkError(err, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: response.data.messages,
      fieldsErrors: response.data.fieldsErrors,
    });
  }
});

export const logoutTC = createAsyncThunk(
  "authorization/logout",
  async ({}, thunkAPI) => {
    const response = await authAPI.logout();

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      if (response.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return { isLoggedIn: false };
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
        return { isLoggedIn: true };
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    });

    builder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    });
  },
});

export const authReducer = slice.reducer;

// ==== SELECTORS ====

export const isLoggedInSelector = (state: RootStateType) =>
  state.auth.isLoggedIn;

// ==== TYPES ====
