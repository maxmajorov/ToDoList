import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  appReducer,
  authReducer,
  tasksReducer,
  todolistsReducer,
} from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// ======Создаем Store======

const rootReducers = combineReducers({
  todoList: todolistsReducer,
  task: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

type RootReducersType = typeof rootReducers;

// export const store: Store<RootStateType> = createStore(
//   rootReducers,
//   composeWithDevTools(applyMiddleware(thunkMiddleware))
// );

export const store: Store<RootStateType> = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
  // prepend and concat calls can be chained
  // .concat(logger),
});

export type RootStateType = ReturnType<RootReducersType>;

// export const useAppDispatch = () => useDispatch<RootStateType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

//@ts-ignore
window.store = store;
