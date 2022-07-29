import { AppThunk, RootStateType } from "./../store";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../../api/api";
import { setAppStatusAC } from "./app-reducer";
import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from "./todoList-reducer";
import { AxiosError } from "axios";

const initialState: TasksStateType = {};

// ==== THUNKS ====

export const fetchTasksTC = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, thunkAPI) => {
    const response = await todolistsAPI.getTasks(todolistId);
    const tasks = response.data.items;

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));

      // thunkAPI.dispatch(setTasksAC({ tasks, todolistId }));
      return { tasks, todolistId };
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
    } finally {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
      return { tasks, todolistId }; //Пока так, а то будет ругаться на пустой объект
    }
  }
);

export const removeTaskTC = createAsyncThunk(
  "tasks/removeTask",
  async (param: { taskId: string; todolistId: string }, thunkAPI) => {
    const response = todolistsAPI.deleteTask(param.todolistId, param.taskId);

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));

      return {
        taskId: param.taskId,
        todolistId: param.todolistId,
      };
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
    } finally {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    }
  }
);

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },

    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todolistId: string;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      tasks[index] = { ...tasks[index], ...action.payload.model };
    },
  },
  extraReducers(builder) {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });

    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });

    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });

    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload?.tasks;
    });

    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(
          (task) => task.id === action.payload?.taskId
        );

        if (index >= -1) {
          tasks.splice(index, 1);
        }
      }
    });
  },
});

export const tasksReducer = slice.reducer;

export const { addTaskAC, updateTaskAC } = slice.actions;

// ==== THUNKS ====

export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item;
          const action = addTaskAC({ task });
          dispatch(action);
          dispatch(setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
  ): AppThunk =>
  (dispatch, getState: () => RootStateType) => {
    const state = getState();
    const task = state.task[todolistId].find((t) => t.id === taskId);
    if (!task) {
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
      ...model,
    };

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({ taskId, model, todolistId }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

// ==== SELECTORS ====

export const tasksSelector = (state: RootStateType) => state.task;

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
