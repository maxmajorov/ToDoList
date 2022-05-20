export const ADD_NEW_TASK = "ADD-NEW-TASK";
export const REMOVE_TASK = "REMOVE-TASK";
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS";
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE";
export const ADD_EMPTY_ARRAY_TASK = "ADD-EMPTY-ARRAY-TASK";

type AddNewTaskACType = {
  type: typeof ADD_NEW_TASK;
  newItem: string;
  todoListID: string;
};

export const addNewTaskAC = (
  newTaskName: string,
  todoListID: string
): AddNewTaskACType => ({
  type: ADD_NEW_TASK,
  newItem: newTaskName,
  todoListID: todoListID,
});

type AddEmptyArrayTaskACType = {
  type: typeof ADD_EMPTY_ARRAY_TASK;
  newTodoListID: string;
};

export const addEmptyArrayTaskAC = (
  newTodoListID: string
): AddEmptyArrayTaskACType => ({
  type: ADD_EMPTY_ARRAY_TASK,
  newTodoListID: newTodoListID,
});

type ChangeTaskStatusACType = {
  type: typeof CHANGE_TASK_STATUS;
  taskID: string;
  isDone: boolean;
  todoListID: string;
};

export const changeTaskStatusAC = (
  taskID: string,
  isDone: boolean,
  todoListID: string
): ChangeTaskStatusACType => ({
  type: CHANGE_TASK_STATUS,
  taskID: taskID,
  isDone: isDone,
  todoListID: todoListID,
});

type RemoveTaskACType = {
  type: typeof REMOVE_TASK;
  taskID: string;
  todoListID: string;
};

export const removeTaskAC = (
  taskID: string,
  todoListID: string
): RemoveTaskACType => ({
  type: REMOVE_TASK,
  taskID: taskID,
  todoListID: todoListID,
});

type ChangeTaskTitleACType = {
  type: typeof CHANGE_TASK_TITLE;
  changedTaskName: string;
  todoListID: string;
  taskID: string;
};

export const changeTaskTitleAC = (
  changedTaskName: string,
  todoListID: string,
  taskID: string
): ChangeTaskTitleACType => ({
  type: CHANGE_TASK_TITLE,
  changedTaskName: changedTaskName,
  todoListID: todoListID,
  taskID: taskID,
});

export type ActionsType =
  | AddNewTaskACType
  | ChangeTaskStatusACType
  | RemoveTaskACType
  | ChangeTaskTitleACType
  | AddEmptyArrayTaskACType;
