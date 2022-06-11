import { todolistsAPI } from "../../api/api";
import {
  setTodolistsAC,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
} from "../actions";
import { Dispatch } from "redux";
import { ActionsType } from "../actions/todo-actions";

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
    });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(changeTodolistTitleAC(id, title));
    });
  };
};
