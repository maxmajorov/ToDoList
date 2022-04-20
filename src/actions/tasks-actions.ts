export const ADD_NEW_TASK = "ADD-NEW-TASK";
export const REMOVE_TASK = "REMOVE-TASK";
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS";
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE";

export type ActionsType =
  | AddNewTaskACType
  | ChangeTaskStatusACType
  | RemoveTaskACType
  | ChangeTaskTitleACType;

type AddNewTaskACType = {
  type: typeof ADD_NEW_TASK;
  newItem: string;
  todoListID: string;
};

type ChangeTaskStatusACType = {
  type: typeof CHANGE_TASK_STATUS;
  taskID: string;
  isDone: boolean;
  todoListID: string;
};

type RemoveTaskACType = {
  type: typeof REMOVE_TASK;
  taskID: string;
  todoListID: string;
};

type ChangeTaskTitleACType = {
  type: typeof CHANGE_TASK_TITLE;
  changedTaskName: string;
  todoListID: string;
  taskID: string;
};

export const addNewTaskAC = (
  newTaskName: string,
  todoListID: string
): AddNewTaskACType => ({
  type: ADD_NEW_TASK,
  newItem: newTaskName,
  todoListID: todoListID,
});

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

export const removeTaskAC = (
  taskID: string,
  todoListID: string
): RemoveTaskACType => ({
  type: REMOVE_TASK,
  taskID: taskID,
  todoListID: todoListID,
});

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
