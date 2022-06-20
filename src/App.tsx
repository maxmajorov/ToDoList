import React, { useEffect } from "react";
import { Container } from "@mui/material";
import "./App.css";
import { TodoAppBar } from "./components/AppBar/AppBar";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";
import { ToDoListContainer } from "./components/ToDoList/ToDoListContainer";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404/Error404";
import { useAppSelector } from "./store/store";
import { selectAppInitialize } from "./store/selectors";
import { useDispatch } from "react-redux";
import { initializeAppTC } from "./store/thunks/app-thunk";

export const App = () => {
  const isInitialized = useAppSelector(selectAppInitialize);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  return !isInitialized ? (
    <>
      <TodoAppBar />
    </>
  ) : (
    <div className="App">
      <ErrorSnackbar />
      <TodoAppBar />
      <Container fixed>
        <Routes>
          <Route path="/" element={<ToDoListContainer />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  );
};
