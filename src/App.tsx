import React from "react";
import "./App.css";
import ToDoList from "../src/components/ToDoList/ToDoList";

type TasksType = {
  id: number;
  text: string;
  isDone: boolean;
};

type AppPropsType = {
  tasks: Array<TasksType>;
};

function App(props: AppPropsType) {
  type TasksType = {
    id: number;
    text: string;
    isDone: boolean;
  };

  let tasks: Array<Array<TasksType>> = [
    [
      { id: 1, text: "HTML", isDone: true },
      { id: 2, text: "CSS", isDone: true },
      { id: 3, text: "React", isDone: true },
    ],
    [
      { id: 1, text: "FLUX", isDone: true },
      { id: 2, text: "REDUX", isDone: true },
      { id: 3, text: "Store, state, dispatch, action", isDone: false },
    ],
    [
      { id: 1, text: "Learn lesson 39", isDone: true },
      { id: 2, text: "Learn lesson 40", isDone: false },
      { id: 3, text: "Learn lesson 41", isDone: true },
    ],
  ];

  return (
    <div className="App">
      <ToDoList title="What to learn" tasks={tasks[0]} />
      <ToDoList title="Day's tasks" tasks={tasks[1]} />
      <ToDoList title="Homework" tasks={tasks[2]} />
    </div>
  );
}

export default App;
