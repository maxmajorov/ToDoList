import { RootStateType } from "./../store";
import { todolistsAPI } from "../../api/api";
import { TodolistType } from "../../api/types";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// ==== THUNKS ====

export const fetchTodolistsTC = createAsyncThunk(
  "todolist/fetchTodolists",
  async (params, { dispatch, rejectWithValue }) => {
    const response = await todolistsAPI.getTodolists();

    try {
      dispatch(setAppStatusAC({ status: "loading" }));
      if (response.status === 200) {
        dispatch(setAppStatusAC({ status: "succeeded" }));
        return { todolists: response.data };
      } else {
        // handleServerAppError(response.data., dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, dispatch);
      return rejectWithValue({
        errors: response.status,
      });
    }
  }
);

export const removeTodolistTC = createAsyncThunk(
  "todolist/removeTodolist",
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    const response = await todolistsAPI.deleteTodolist(todolistId);

    try {
      dispatch(setAppStatusAC({ status: "loading" }));
      if (response.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: "succeeded" }));
        dispatch(
          changeTodolistEntityStatusAC({ id: todolistId, status: "loading" })
        );
        return { id: todolistId };
      } else {
        handleServerAppError(response.data, dispatch);
        return rejectWithValue({
          errors: "response.data.messages",
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, dispatch);
      return rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

export const addTodolistTC = createAsyncThunk(
  "todolist/addTodolist",
  async (title: string, { dispatch, rejectWithValue }) => {
    const response = await todolistsAPI.createTodolist(title);

    try {
      dispatch(setAppStatusAC({ status: "loading" }));
      return { todolist: response.data.data.item };
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, dispatch);
      return rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

export const changeTodolistTitleTC = createAsyncThunk(
  "todolist/changeTodolistTitle",
  async (
    params: { id: string; title: string },
    { dispatch, rejectWithValue }
  ) => {
    const response = await todolistsAPI.updateTodolist(params.id, params.title);

    try {
      dispatch(setAppStatusAC({ status: "loading" }));
      if (response.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: "succeeded" }));
        return {
          id: params.id,
          title: params.title,
        };
      } else {
        handleServerAppError(response.data, dispatch);
        return rejectWithValue({
          errors: response.data.messages,
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, dispatch);
      return rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

const slice = createSlice({
  name: "todolist",
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },

    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    });

    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    });

    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    });

    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].title = action.payload.title;
    });
  },
});

export const todolistsReducer = slice.reducer;

export const { changeTodolistFilterAC, changeTodolistEntityStatusAC } =
  slice.actions;

// ==== SELECTORS ====

export const todolistSelector = (state: RootStateType) => state.todoList;

// ==== TYPES ====

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
