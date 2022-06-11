import { TaskPriorities, TaskStatuses, TaskType } from "../../api/api";
import {
  ADD_NEW_TASK,
  REMOVE_TASK,
  SET_TASKS,
  ActionsType,
  UPDATE_TASK,
} from "../actions/tasks-actions";
import {
  ADD_NEW_TODOLIST,
  REMOVE_TODOLIST,
  SET_TODOLISTS,
} from "../actions/todo-actions";

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    case UPDATE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    case ADD_NEW_TODOLIST:
      return { ...state, [action.todolist.id]: [] };
    case REMOVE_TODOLIST:
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    case SET_TODOLISTS: {
      const copyState = { ...state };
      action.todolists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
    }
    case SET_TASKS:
      return { ...state, [action.todolistId]: action.tasks };
    default:
      return state;
  }
};

// ==== TYPES ====

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
