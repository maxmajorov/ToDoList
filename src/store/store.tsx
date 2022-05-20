import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { tasksReducer, todoListReducer } from "./reducers";

// ======Создаем Store======
// У Store уже есть методы getState, dispatch

const rootReducers = combineReducers({
  todoList: todoListReducer,
  task: tasksReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

//@ts-ignore
window.store = store;
