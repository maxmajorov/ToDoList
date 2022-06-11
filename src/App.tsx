import { Container } from "@mui/material";
import React from "react";
import "./App.css";
import { TodoAppBar } from "./components/AppBar/AppBar";
import { ToDoListContainer } from "./components/ToDoList/ToDoListContainer";

export const App = () => {
  return (
    <div className="App">
      <TodoAppBar />
      <Container fixed>
        <ToDoListContainer />
      </Container>
    </div>
  );
};
