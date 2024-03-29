import React, { useEffect } from "react";
import { Container } from "@mui/material";
import "./App.css";
import { TodoAppBar } from "../components/AppBar/AppBar";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { LoginForm } from "../features/LoginForm/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Error404 from "../components/Error404/Error404";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  appInitializeSelector,
  initializeAppTC,
} from "../store/reducers/app-reducer";
import { TodolistsList } from "../features/ToDoList/TodolistsList";

export const App = () => {
  const isInitialized = useAppSelector(appInitializeSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <>
        <TodoAppBar />
      </>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <TodoAppBar />
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  );
};
