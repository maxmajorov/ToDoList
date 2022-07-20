import { combineReducers, Store } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
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

type RootReducersType = typeof rootReducers;

export const store: Store<RootStateType> = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
  // prepend and concat calls can be chained
  // .concat(logger),
});

export type RootStateType = ReturnType<RootReducersType>;
// export type AppRootActionsType

// ==== DISPATCH & SELECTOR TYPES ====

export type useAppDispatchType = ThunkDispatch<
  RootStateType,
  unknown,
  // AppRootActionsType
  any
>;

export const useAppDispatch = () => useDispatch<useAppDispatchType>();
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
