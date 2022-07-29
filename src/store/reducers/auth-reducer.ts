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

export const loginTC = createAsyncThunk(
  "authorization/login",
  async (data: LoginParamsType, thunkAPI) => {
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
  },
});

export const authReducer = slice.reducer;

// ==== ACTIONS ====

// ==== THUNKS ====

// export const logoutTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC({ status: "loading" }));
//   authAPI
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(setIsLoggedInAC({ value: false }));
//         dispatch(setAppStatusAC({ status: "succeeded" }));
//       } else {
//         // handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// ==== SELECTORS ====

export const isLoggedInSelector = (state: RootStateType) =>
  state.auth.isLoggedIn;

// ==== TYPES ====
