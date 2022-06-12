import { appSetErrorAC } from "./../actions/app-actions";
import { RootStateType } from "./../store";
import { todolistsAPI, UpdateTaskModelType } from "../../api/api";
import { Dispatch } from "redux";
import {
  addTaskAC,
  appSetStatusAC,
  removeTaskAC,
  setTasksAC,
  updateTaskAC,
} from "../actions";
import { UpdateDomainTaskModelType } from "../reducers/tasks-reducer";
import { ActionsType, setTaskEntityStatusAC } from "../actions/tasks-actions";
import { AxiosError } from "axios";

export const fetchTasksTC =
  (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI
      .getTasks(todolistId)
      .then((res) => {
        if (res.data.error) {
          dispatch(appSetErrorAC(res.data.error));
        } else {
          dispatch(setTasksAC(res.data.items, todolistId));
        }
      })
      .catch((err: AxiosError) => {
        dispatch(appSetErrorAC(err.message));
      })
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        dispatch(removeTaskAC(taskId, todolistId));
      })
      .catch((err: AxiosError) => {
        dispatch(appSetErrorAC(err.message));
      })
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode !== 0) {
          dispatch(appSetErrorAC(res.data.messages[0]));
        } else {
          dispatch(addTaskAC(res.data.data.item));
        }
      })
      .catch((err: AxiosError) => {
        dispatch(appSetErrorAC(err.message));
      })
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

export const updateTaskTC =
  (
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
  ) =>
  (dispatch: Dispatch<ActionsType>, getState: () => RootStateType) => {
    const state = getState();
    const task = state.task[todolistId].find((t) => t.id === taskId);
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    dispatch(appSetStatusAC("loading"));
    dispatch(setTaskEntityStatusAC(taskId, todolistId, "loading"));
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(taskId, domainModel, todolistId));
        } else {
          dispatch(appSetErrorAC(res.data.messages[0]));
        }
      })
      .catch((err: AxiosError) => {
        dispatch(appSetErrorAC(err.message));
      })
      .finally(() => {
        dispatch(appSetStatusAC("idle"));
      });
  };
