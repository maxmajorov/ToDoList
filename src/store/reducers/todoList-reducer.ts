import { TodolistType } from "../../api/api";
import {
  SET_TODOLISTS,
  ActionsType,
  REMOVE_TODOLIST,
  ADD_NEW_TODOLIST,
  CHANGE_TITLE,
  CHANGE_FILTER,
  SET_ENTITY_STATUS,
} from "../actions/todo-actions";
import { RequestStatusType } from "./app-reducer";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter((tl) => tl.id !== action.id);
    case ADD_NEW_TODOLIST:
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];
    case CHANGE_TITLE:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case CHANGE_FILTER:
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case SET_TODOLISTS:
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    case SET_ENTITY_STATUS:
      return state.map((tl) =>
        tl.id === action.todolistId
          ? { ...tl, entityStatus: action.entityStatus }
          : tl
      );
    default:
      return state;
  }
};

// TYPES
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
