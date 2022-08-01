import { removeTodolistTC } from "./../todoList-reducer";
import { TodolistType } from "../../../api/api";
import { tasksReducer, TasksStateType } from "../tasks-reducer";
import {
  addTodolistTC,
  TodolistDomainType,
  todolistsReducer,
} from "../todoList-reducer";

let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  startState = [
    {
      id: "1",
      title: "HTML",
      order: 0,
      addedDate: "",
      filter: "all",
      entityStatus: "idle",
    },
    {
      id: "2",
      title: "HTML",
      order: 0,
      addedDate: "",
      filter: "all",
      entityStatus: "idle",
    },
  ];
});

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let todolist: TodolistType = {
    id: "id",
    title: "new todolist",
    addedDate: "",
    order: 0,
  };

  const action = addTodolistTC.fulfilled(
    { todolist },
    "requestId",
    "New todoList"
  );
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test("correct todolist should be delete", () => {
  const action = removeTodolistTC.fulfilled(
    { id: "todoListID_1" },
    "requestId",
    "todoListID_1"
  );

  const endState = todolistsReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
});

// Дописать на остальные кейсы
