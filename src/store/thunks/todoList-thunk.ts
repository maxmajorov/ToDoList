import { AxiosError } from "axios";
import { todolistsAPI } from "../../api/api";
import {
  setTodolistsAC,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  appSetStatusAC,
  appSetErrorAC,
} from "../actions";
import { Dispatch } from "redux";
import { ActionsType, setEntityStatusAC } from "../actions/todo-actions";

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data));
      })
      .catch((err: AxiosError) => dispatch(appSetErrorAC(err.message)))
      .finally(() => {
        dispatch(appSetStatusAC("idle"));
      });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    dispatch(setEntityStatusAC(todolistId, "loading"));
    todolistsAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolistAC(todolistId));
          dispatch(setEntityStatusAC(todolistId, "failed"));
        } else {
          dispatch(appSetErrorAC(res.data.messages[0]));
        }
      })
      .catch((err: AxiosError) => dispatch(appSetErrorAC(err.message)))
      .finally(() => dispatch(appSetStatusAC("idle")));
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTodolistAC(res.data.data.item));
        } else {
          dispatch(appSetErrorAC(res.data.messages[0]));
        }
      })
      .catch((err: AxiosError) => dispatch(appSetErrorAC(err.message)))
      .finally(() => dispatch(appSetStatusAC("idle")));
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI
      .updateTodolist(id, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTodolistTitleAC(id, title));
        } else {
          dispatch(appSetErrorAC(res.data.messages[0]));
        }
      })
      .catch((err: AxiosError) => dispatch(appSetErrorAC(err.message)))
      .finally(() => dispatch(appSetStatusAC("idle")));
  };
};
