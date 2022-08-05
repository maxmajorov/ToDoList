import { combineReducers } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import {
  appReducer,
  authReducer,
  tasksReducer,
  todolistsReducer,
} from "./reducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// ==== CREATE STORE ====

const rootReducers = combineReducers({
  todoList: todolistsReducer,
  task: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
  // prepend and concat calls can be chained
  // .concat(logger),
});

export type RootStateType = ReturnType<typeof store.getState>;

// ==== DISPATCH & SELECTOR TYPES ====

export type AppDispatchType = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// ==== THUNKS TYPES

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  // AppRootActionsType
  any
>;

//@ts-ignore
window.store = store;
