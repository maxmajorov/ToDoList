import { removeTaskTC, UpdateDomainTaskModelType } from "./../tasks-reducer";
import { TaskPriorities, TaskType, TodolistType } from "./../../../api/api";
import {
  addTaskTC,
  tasksReducer,
  TasksStateType,
  updateTaskTC,
} from "../tasks-reducer";
import { addTodolistTC } from "../todoList-reducer";

let startState: TasksStateType = {};

beforeEach(() => {
  startState = {
    todoListID_1: [
      {
        id: "1",
        title: "HTML",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_1",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
      {
        id: "2",
        title: "CSS",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_1",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
      {
        id: "3",
        title: "JS / TS",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_1",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
    ],
    todoListID_2: [
      {
        id: "1",
        title: "Milk",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_2",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
      {
        id: "2",
        title: "Bread",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_2",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
      {
        id: "3",
        title: "Vegetables",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_2",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
    ],
  };
});

test("correct task should be removed", () => {
  const action = removeTaskTC.fulfilled(
    {
      taskId: startState["todoListID_1"][0].id,
      todolistId: "todoListID_1",
    },
    "requestID",
    {
      taskId: startState["todoListID_1"][0].id,
      todolistId: "todoListID_1",
    }
  );
  const endState = tasksReducer(startState, action);

  expect(endState["todoListID_1"].length).toBe(2);
  expect(endState).toEqual({
    todoListID_1: [
      {
        id: "2",
        title: "CSS",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_1",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
      {
        id: "3",
        title: "JS / TS",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_1",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
    ],
    todoListID_2: [
      {
        id: "1",
        title: "Milk",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_2",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
      {
        id: "2",
        title: "Bread",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_2",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
      {
        id: "3",
        title: "Vegetables",
        status: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListID_2",
        order: 0,
        addedDate: "",
        entityTaskStatus: "succeeded",
        description: "",
      },
    ],
  });
});

test("correct task should be added", () => {
  const newTask: TaskType = {
    description: "",
    title: "New task",
    status: 0,
    priority: 2,
    startDate: "",
    deadline: "",
    id: "4",
    todoListId: "todoListID_2",
    order: 0,
    addedDate: "",
    entityTaskStatus: "succeeded",
  };

  const endState = tasksReducer(
    startState,
    addTaskTC.fulfilled(newTask, "requestId", {
      title: "New task",
      todolistId: "ssss-vvvv-bbbb",
    })
  );

  expect(endState["todoListID_2"].length).toBe(4);
  expect(endState["todoListID_2"][0].title).toBe("New task");
  expect(endState["todoListID_2"][0].id).toBeDefined();
});

test("correct task should update title", () => {
  const model: UpdateDomainTaskModelType = {
    title: "New task title",
  };

  const action = updateTaskTC.fulfilled(
    {
      taskId: "1",
      model,
      todolistId: "todoListID_1",
    },
    "requestId",
    {
      taskId: "1",
      model,
      todolistId: "todoListID_1",
    }
  );
  const endState = tasksReducer(startState, action);

  expect(endState["todoListID_1"][0].title).toBe("New task title");
});

test("correct task should be changed status", () => {
  const model: UpdateDomainTaskModelType = {
    status: 2,
  };

  const action = updateTaskTC.fulfilled(
    {
      taskId: "1",
      model,
      todolistId: "todoListID_1",
    },
    "requestId",
    {
      taskId: "1",
      model,
      todolistId: "todoListID_1",
    }
  );

  const endState = tasksReducer(startState, action);

  expect(endState["todoListID_1"][0].status).toBe(2);
});

test("new empty array should be add when todoList add", () => {
  const newTodo: TodolistType = {
    id: "todoListID_3",
    title: "New todo",
    addedDate: "",
    order: 0,
  };

  const action = addTodolistTC.fulfilled(
    { todolist: newTodo },
    "requestId",
    "new todo"
  );
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(
    (key) => key !== "todoListID_1" && key !== "todoListID_2"
  );

  if (!newKey) {
    throw Error("New key should be added!");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
