import { todolistsAPI } from "../../api/api";
import {
  setTodolistsAC,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  appSetStatusAC,
} from "../actions";
import { Dispatch } from "redux";
import { ActionsType } from "../actions/todo-actions";

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(appSetStatusAC("succeeded"));
    });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
      dispatch(appSetStatusAC("succeeded"));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(appSetStatusAC("succeeded"));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(changeTodolistTitleAC(id, title));
      dispatch(appSetStatusAC("succeeded"));
    });
  };
};
