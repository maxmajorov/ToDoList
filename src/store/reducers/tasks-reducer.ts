import { RootStateType } from "./../store";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { setAppStatusAC } from "./app-reducer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTodolistTC,
  fetchTodolistsTC,
  removeTodolistTC,
} from "./todoList-reducer";
import { AxiosError } from "axios";
import { todolistsAPI } from "../../api/api";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from "../../api/types";

// ==== THUNKS ====

export const fetchTasksTC = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, thunkAPI) => {
    const response = await todolistsAPI.getTasks(todolistId);
    const tasks = response.data.items;

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
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
    const response = await todolistsAPI.deleteTask(
      param.todolistId,
      param.taskId
    );

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      if (response.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return {
          taskId: param.taskId,
          todolistId: param.todolistId,
        };
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

export const addTaskTC = createAsyncThunk(
  "tasks/addTask",
  async (param: { title: string; todolistId: string }, thunkAPI) => {
    const response = await todolistsAPI.createTask(
      param.todolistId,
      param.title
    );

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      if (response.data.resultCode === 0) {
        const task = response.data.data.item;
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return task;
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({
          errors: response.data.messages,
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

export const updateTaskTC = createAsyncThunk(
  "tasks/updateTask",
  async (
    param: {
      taskId: string;
      model: UpdateDomainTaskModelType;
      todolistId: string;
    },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootStateType;
    const task = state.task[param.todolistId].filter((t) => {
      if (t.id === param.taskId) {
        return t;
      }
      return t;
    })[0];

    if (!task) {
      thunkAPI.rejectWithValue("No match");
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...param.model,
    };

    const response = await todolistsAPI.updateTask(
      param.todolistId,
      param.taskId,
      apiModel
    );

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      if (response.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return {
          todolistId: param.todolistId,
          model: param.model,
          taskId: param.taskId,
        };
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({
          errors: response.data.messages,
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = [];
    });

    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });

    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
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

    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift(action.payload);
    });

    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      tasks[index] = { ...tasks[index], ...action.payload.model };
    });
  },
});

export const tasksReducer = slice.reducer;

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
