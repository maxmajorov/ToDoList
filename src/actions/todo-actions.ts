import { FilterValuesType } from "../reducers/todoList-reducer";

// ===== ACTIONS =====
export const ADD_NEW_TODOLIST = "ADD-NEW-TODOLIST";
export const CHANGE_FILTER = "CHANGE-FILTER";
export const REMOVE_TODOLIST = "REMOVE-TODOLIST";
export const CHANGE_TITLE = "CHANGE_TITLE";
export const DROP_LIST = "DROP-LIST";

type AddNewTodoListACType = {
  type: typeof ADD_NEW_TODOLIST;
  newItem: string;
  newTodoListID: string;
};

export const addNewTodoListAC = (
  newItem: string,
  newTodoListID: string
): AddNewTodoListACType => ({
  type: ADD_NEW_TODOLIST,
  newItem: newItem,
  newTodoListID: newTodoListID,
});

type ChangeFilterACType = {
  type: typeof CHANGE_FILTER;
  filter: FilterValuesType;
  todoListID: string;
};

export const changeFilterAC = (
  todoListID: string,
  filter: FilterValuesType
): ChangeFilterACType => ({
  type: CHANGE_FILTER,
  filter: filter,
  todoListID: todoListID,
});

type RemoveTodoListACType = {
  type: typeof REMOVE_TODOLIST;
  todoListID: string;
};

export const removeTodoListAC = (todoListID: string): RemoveTodoListACType => ({
  type: REMOVE_TODOLIST,
  todoListID: todoListID,
});

type ChangeTodoListTitleACType = {
  type: typeof CHANGE_TITLE;
  changedTitle: string;
  todoListID: string;
};

export const changeTodoListTitleAC = (
  changedTitle: string,
  todoListID: string
): ChangeTodoListTitleACType => ({
  type: CHANGE_TITLE,
  changedTitle: changedTitle,
  todoListID: todoListID,
});

type DropListACType = {
  type: typeof DROP_LIST;

  todoListID: string;
};

export const dropListAC = (todoListID: string): DropListACType => ({
  type: DROP_LIST,
  todoListID: todoListID,
});

export type ActionsType =
  | AddNewTodoListACType
  | ChangeFilterACType
  | RemoveTodoListACType
  | ChangeTodoListTitleACType
  | DropListACType;
