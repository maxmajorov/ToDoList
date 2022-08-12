import { combineReducers } from "redux";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todoList-reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todolists: todolistsReducer,
  tasks: tasksReducer,
});
