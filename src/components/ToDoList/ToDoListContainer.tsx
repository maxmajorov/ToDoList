import React, { useCallback, useEffect } from "react";
import { TaskStatuses } from "../../api/api";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Todolist } from "./ToDoList";
import { Navigate } from "react-router-dom";
import { appInitializeSelector } from "../../store/reducers/app-reducer";
import {
  addTaskTC,
  removeTaskTC,
  tasksSelector,
  updateTaskTC,
} from "../../store/reducers/tasks-reducer";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  todolistSelector,
} from "../../store/reducers/todoList-reducer";
import { isLoggedInSelector } from "../../store/reducers/auth-reducer";

export const ToDoListContainer: React.FC = () => {
  const isInitialize = useAppSelector(appInitializeSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const todolists = useAppSelector(todolistSelector);
  const tasks = useAppSelector(tasksSelector);
  const dispatch = useAppDispatch();

  // Download todolists from server

  useEffect(() => {
    if (!isInitialize) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, []);

  // ====== FUNCTION FOR CHANGING TASKS_ITEM======

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskTC(id, todolistId));
  }, []);

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(title, todolistId));
  }, []);

  const changeStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(id, { status }, todolistId));
    },
    []
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(updateTaskTC(id, { title: newTitle }, todolistId));
    },
    []
  );

  const changeFilter = useCallback((id: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id, filter }));
  }, []);

  // ====== FUNCTION FOR CHANGING TODOLIST ======

  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodolistTC(id));
  }, []);

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleTC(id, title));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  id={tl.id}
                  title={tl.title}
                  tasks={allTodolistTasks}
                  entityStatus={tl.entityStatus}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
