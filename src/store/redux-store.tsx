import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { tasksReducer } from "../reducers/tasks-reducer";
import { todoListReducer } from "../reducers/todoList-reducer";

// import { taskSlice } from "./tasksSlice";

// ======Создаем Store======
// У Store уже есть методы getState, dispatch

const rootReducers = combineReducers({
  todoList: todoListReducer,
  // task: taskSlice.reducer,
  task: tasksReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
