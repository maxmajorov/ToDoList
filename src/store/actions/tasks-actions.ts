import { TaskType } from "../../api/api";
import { UpdateDomainTaskModelType } from "../reducers/tasks-reducer";
import {
  SetTodolistsActionType,
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todo-actions";

export const SET_TASKS = "SET-TASKS";
export const ADD_NEW_TASK = "ADD-NEW-TASK";
export const REMOVE_TASK = "REMOVE-TASK";
export const UPDATE_TASK = "UPDATE-TASK";

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({ type: REMOVE_TASK, taskId, todolistId } as const);
export const addTaskAC = (task: TaskType) =>
  ({ type: ADD_NEW_TASK, task } as const);
export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todolistId: string
) => ({ type: UPDATE_TASK, model, todolistId, taskId } as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({ type: SET_TASKS, tasks, todolistId } as const);

export type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>;
