import { TodolistType } from "../../../api/api";
import { tasksReducer, TasksStateType } from "../tasks-reducer";
import {
  addTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from "../todoList-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let todolist: TodolistType = {
    id: "id",
    title: "new todolist",
    addedDate: "",
    order: 0,
  };

  const action = addTodolistAC({ todolist });
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
