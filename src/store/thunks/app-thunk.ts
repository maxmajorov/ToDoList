import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { authAPI } from "../../api/api";
import { initializeAppAC } from "../actions";
import { ActionsType } from "../actions/app-actions";
import { appSetErrorAC, appSetStatusAC } from "../actions/index";

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI
    .authMe()
    .then((res) => {
      if (res.data.resultCode !== 0) {
        dispatch(appSetErrorAC(res.data.messages[0]));
      } else {
        dispatch(initializeAppAC());
      }
    })
    .catch((err: AxiosError) => {
      dispatch(appSetErrorAC(err.message));
    })
    .finally(() => dispatch(appSetStatusAC("idle")));
};
