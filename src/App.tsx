import React from "react";
import "./App.css";

import { TodoAppBar } from "./components/AppBar/AppBar";
import { ToDoListContainer } from "./components/ToDoList/ToDoListContainer";

export const App = () => {
  return (
    <>
      <TodoAppBar />
      <div className="App">
        <ToDoListContainer />
      </div>
    </>
  );
};
