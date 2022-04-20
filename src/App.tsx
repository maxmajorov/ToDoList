import React from "react";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { TodoAppBar } from "./components/AppBar/AppBar";
import { ToDoListContainer } from "./components/ToDoList/ToDoListContainer";

export const App = () => {
  return (
    <>
      <TodoAppBar />
      <div className="App">
        {/* <AddItemForm /> */}
        <ToDoListContainer />
      </div>
    </>
  );
};
