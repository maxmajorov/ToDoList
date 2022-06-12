import React from "react";
import { Container } from "@mui/material";
import "./App.css";
import { TodoAppBar } from "./components/AppBar/AppBar";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";
import { ToDoListContainer } from "./components/ToDoList/ToDoListContainer";

export const App = () => {
  return (
    <div className="App">
      <ErrorSnackbar />
      <TodoAppBar />
      <Container fixed>
        <ToDoListContainer />
      </Container>
    </div>
  );
};
