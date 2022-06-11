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
import { ActionsType } from "../actions/tasks-actions";

export const fetchTasksTC =
  (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items;
      dispatch(setTasksAC(tasks, todolistId));
      dispatch(appSetStatusAC("succeeded"));
    });
  };

export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC(taskId, todolistId));
      dispatch(appSetStatusAC("succeeded"));
    });
  };

export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC("loading"));
    todolistsAPI.createTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      dispatch(addTaskAC(task));
      dispatch(appSetStatusAC("succeeded"));
    });
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
    todolistsAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
      dispatch(updateTaskAC(taskId, domainModel, todolistId));
      dispatch(appSetStatusAC("succeeded"));
    });
  };
