import React from "react";
import { v1 } from "uuid";
import { tasksReducer, TaskStateType } from "../tasks-reducer";
import {
  addEmptyArrayTaskAC,
  addNewTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../actions/tasks-actions";

test("correct task should be removed", () => {
  let todoListID_1 = v1();
  let todoListID_2 = v1();

  let startState: TaskStateType = {
    [todoListID_1]: [
      { id: "1", text: "HTML", isDone: true },
      { id: "2", text: "React", isDone: false },
      { id: "3", text: "TypeScript", isDone: false },
    ],
    [todoListID_2]: [
      { id: "1", text: "Milk", isDone: true },
      { id: "2", text: "Bread", isDone: true },
      { id: "3", text: "Salt", isDone: false },
    ],
  };

  const action = removeTaskAC(startState[todoListID_1][1].id, todoListID_1);
  const endState = tasksReducer(startState, action);

  expect(endState[todoListID_1].length).toBe(2);
  expect(endState).toEqual({
    [todoListID_1]: [
      { id: "1", text: "HTML", isDone: true },
      { id: "3", text: "TypeScript", isDone: false },
    ],
    [todoListID_2]: [
      { id: "1", text: "Milk", isDone: true },
      { id: "2", text: "Bread", isDone: true },
      { id: "3", text: "Salt", isDone: false },
    ],
  });
});

test("correct task should be added", () => {
  let todoListID_1 = v1();
  let todoListID_2 = v1();

  let startState: TaskStateType = {
    [todoListID_1]: [
      { id: "1", text: "HTML", isDone: true },
      { id: "2", text: "React", isDone: false },
      { id: "3", text: "TypeScript", isDone: false },
    ],
    [todoListID_2]: [
      { id: "1", text: "Milk", isDone: true },
      { id: "2", text: "Bread", isDone: true },
      { id: "3", text: "Salt", isDone: false },
    ],
  };

  const endState = tasksReducer(
    startState,
    addNewTaskAC("LEARN REACT", todoListID_2)
  );

  expect(endState[todoListID_2].length).toBe(4);
  expect(endState[todoListID_2][0].text).toBe("LEARN REACT");
  expect(endState[todoListID_2][0].id).toBeDefined();
});

test("correct task should change it's name", () => {
  let todoListID_1 = v1();
  let todoListID_2 = v1();

  let startState: TaskStateType = {
    [todoListID_1]: [
      { id: "1", text: "HTML", isDone: true },
      { id: "2", text: "React", isDone: false },
      { id: "3", text: "TypeScript", isDone: false },
    ],
    [todoListID_2]: [
      { id: "1", text: "Milk", isDone: true },
      { id: "2", text: "Bread", isDone: true },
      { id: "3", text: "Salt", isDone: false },
    ],
  };

  const action = changeTaskTitleAC(
    "HHhhheeeey!!!",
    todoListID_1,
    startState[todoListID_1][2].id
  );
  const endState = tasksReducer(startState, action);

  expect(endState[todoListID_1][2].text).toBe("HHhhheeeey!!!");
});

test("correct task should be changed status", () => {
  let todoListID_1 = v1();
  let todoListID_2 = v1();

  let startState: TaskStateType = {
    [todoListID_1]: [
      { id: "1", text: "HTML", isDone: true },
      { id: "2", text: "React", isDone: false },
      { id: "3", text: "TypeScript", isDone: false },
    ],
    [todoListID_2]: [
      { id: "1", text: "Milk", isDone: true },
      { id: "2", text: "Bread", isDone: true },
      { id: "3", text: "Salt", isDone: false },
    ],
  };
  const action = changeTaskStatusAC(
    startState[todoListID_1][1].id,
    true,
    todoListID_1
  );

  const endState = tasksReducer(startState, action);

  expect(endState[todoListID_1][1].isDone).toBe(true);
});

test("new empty array should be add when todoList add", () => {
  let todoListID_1 = v1();
  let todoListID_2 = v1();
  let todoListID_3 = v1();

  let startState: TaskStateType = {
    [todoListID_1]: [
      { id: "1", text: "HTML", isDone: true },
      { id: "2", text: "React", isDone: false },
      { id: "3", text: "TypeScript", isDone: false },
    ],
    [todoListID_2]: [
      { id: "1", text: "Milk", isDone: true },
      { id: "2", text: "Bread", isDone: true },
      { id: "3", text: "Salt", isDone: false },
    ],
  };
  const action = addEmptyArrayTaskAC(todoListID_3);
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(
    (key) => key !== todoListID_1 && key !== todoListID_2
  );

  if (!newKey) {
    throw Error("New key should be added!");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
