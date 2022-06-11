import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskStatuses } from "../../api/api";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { RootStateType } from "../../store/store";
import {
  fetchTodolistsTC,
  removeTaskTC,
  addTaskTC,
  updateTaskTC,
  changeTodolistTitleTC,
  removeTodolistTC,
  addTodolistTC,
} from "../../store/thunks";
import { FilterValuesType } from "../../store/reducers/todoList-reducer";
import { changeTodolistFilterAC } from "../../store/actions";
import { Todolist } from "./ToDoList";

export const ToDoListContainer: React.FC = () => {
  const todolists = useSelector((state: RootStateType) => state.todoList);
  const tasks = useSelector((state: RootStateType) => state.task);
  const dispatch = useDispatch();

  // Download todolists from server

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  // ====== FUNCTION FOR CHANGING TASKS_ITEM======

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTaskTC(id, todolistId));
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(addTaskTC(title, todolistId));
  }, []);

  const changeStatus = useCallback(function (
    id: string,
    status: TaskStatuses,
    todolistId: string
  ) {
    dispatch(updateTaskTC(id, { status }, todolistId));
  },
  []);

  const changeTaskTitle = useCallback(function (
    id: string,
    newTitle: string,
    todolistId: string
  ) {
    dispatch(updateTaskTC(id, { title: newTitle }, todolistId));
  },
  []);

  const changeFilter = useCallback(function (
    value: FilterValuesType,
    todolistId: string
  ) {
    dispatch(changeTodolistFilterAC(todolistId, value));
  },
  []);

  // ====== FUNCTION FOR CHANGING TODOLIST ======

  const removeTodolist = useCallback(function (id: string) {
    dispatch(removeTodolistTC(id));
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    dispatch(changeTodolistTitleTC(id, title));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

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
