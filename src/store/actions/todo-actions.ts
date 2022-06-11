import { TodolistType } from "./../../api/api";
import { FilterValuesType } from "../reducers/todoList-reducer";
import { AppSetStatus } from "./app-actions";

// ===== ACTIONS =====
export const SET_TODOLISTS = "SET-TODOLISTS";
export const ADD_NEW_TODOLIST = "ADD-NEW-TODOLIST";
export const CHANGE_FILTER = "CHANGE-FILTER";
export const REMOVE_TODOLIST = "REMOVE-TODOLIST";
export const CHANGE_TITLE = "CHANGE_TITLE";

export const removeTodolistAC = (id: string) =>
  ({ type: REMOVE_TODOLIST, id } as const);
export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: ADD_NEW_TODOLIST, todolist } as const);
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: CHANGE_TITLE,
    id,
    title,
  } as const);
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({
    type: CHANGE_FILTER,
    id,
    filter,
  } as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: SET_TODOLISTS, todolists } as const);

// === TYPES ===

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
  | AppSetStatus;
