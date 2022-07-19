import { AppThunk, RootStateType } from "./../store";
import { todolistsAPI, TodolistType } from "../../api/api";
import { handleServerNetworkError } from "../../utils/error-utils";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodoActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "TODOLIST/REMOVE-TODOLIST":
      return state.filter((tl) => tl.id != action.id);
    case "TODOLIST/ADD-TODOLIST":
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];

    case "TODOLIST/CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case "TODOLIST/CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case "TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, entityStatus: action.status } : tl
      );
    case "TODOLIST/SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    default:
      return state;
  }
};

// ==== ACTIONS ====

export const removeTodolistAC = (id: string) =>
  ({ type: "TODOLIST/REMOVE-TODOLIST", id } as const);
export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: "TODOLIST/ADD-TODOLIST", todolist } as const);
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: "TODOLIST/CHANGE-TODOLIST-TITLE",
    id,
    title,
  } as const);
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({
    type: "TODOLIST/CHANGE-TODOLIST-FILTER",
    id,
    filter,
  } as const);
export const changeTodolistEntityStatusAC = (
  id: string,
  status: RequestStatusType
) =>
  ({
    type: "TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS",
    id,
    status,
  } as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "TODOLIST/SET-TODOLISTS", todolists } as const);

// ==== THUNKS ====

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
      dispatch(setAppStatusAC("succeeded"));
    });
  };

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(setAppStatusAC("succeeded"));
    });
  };

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunk =>
  (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(changeTodolistTitleAC(id, title));
    });
  };

// ==== SELECTORS ====

export const todolistSelector = (state: RootStateType) => state.todoList;

// ==== TYPES ====

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type TodoActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>;

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
