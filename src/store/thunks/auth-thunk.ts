import { authAPI, LoginParamsType } from "../../api/api";
import { loginAC, logoutAC } from "../actions/index";
import { authMeAC } from "../actions/index";
import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { appSetErrorAC, appSetStatusAC } from "../actions/index";
import { ActionsType } from "../actions/app-actions";

// если понадобится login email
export const authUserTC = () => (dispatch: Dispatch<ActionsType>) => {
  return authAPI.authMe().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(authMeAC());
    }
  });
};

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(loginAC());
        } else {
          dispatch(appSetErrorAC(res.data.messages[0]));
        }
      })
      .catch((err: AxiosError) => {
        dispatch(appSetErrorAC(err.message));
      })
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(appSetStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(logoutAC());
      } else {
        dispatch(appSetErrorAC(res.data.messages[0]));
      }
    })
    .catch((err: AxiosError) => {
      dispatch(appSetErrorAC(err.message));
    })
    .finally(() => dispatch(appSetStatusAC("idle")));
};
