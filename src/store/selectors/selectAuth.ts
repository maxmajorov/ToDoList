import { RootStateType } from "../store";

// export const selectLogin = (state: RootStateType) => state.auth.login;

// export const selectMyProfileID = (state: RootStateType) => state.auth.userId;

// export const selectResponseMessage = (state: RootStateType) =>
//   state.auth.responseMessage;

export const selectIsAuth = (state: RootStateType) => state.auth.isAuth;
