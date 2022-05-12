import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToDoList } from "./ToDoList";
import { RootState, store } from "../../store/redux-store";
import {
  addNewTodoListAC,
  changeFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "../../actions/todo-actions";
import {
  addEmptyArrayTaskAC,
  addNewTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../actions/tasks-actions";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { v1 } from "uuid";
import { FilterValuesType } from "../../reducers/todoList-reducer";
import { Grid } from "@material-ui/core";

export const ToDoListContainer = () => {
  const todoListsState = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();

  // ====== FUNCTION FOR CHANGING TODOLIST ======

  const addNewTodoListCallback = useCallback(
    (newItem: string) => {
      const newTodoListID = v1();
      dispatch(addNewTodoListAC(newItem, newTodoListID));
      dispatch(addEmptyArrayTaskAC(newTodoListID));
    },
    [dispatch]
  );

  const removeTodoListCallback = useCallback(
    (todoListID: string) => {
      dispatch(removeTodoListAC(todoListID));
    },
    [dispatch]
  );

  const changeFilterCallback = useCallback(
    (filter: FilterValuesType, todoListID: string) => {
      dispatch(changeFilterAC(todoListID, filter));
    },
    [dispatch]
  );

  const changeTodoListTitleCallback = useCallback(
    (changedTitle: string, todoListID: string) => {
      dispatch(changeTodoListTitleAC(changedTitle, todoListID));
    },
    [dispatch]
  );

  // ====== FUNCTION FOR CHANGING TASKS_ITEM======

  const addTaskCallback = useCallback(
    (newTaskName: string, todoListID: string) => {
      dispatch(addNewTaskAC(newTaskName, todoListID));
    },
    [dispatch]
  );

  const removeTaskItemCallback = useCallback(
    (taskID: string, todoListID: string) => {
      dispatch(removeTaskAC(taskID, todoListID));
    },
    [dispatch]
  );

  const changeTaskStatusCallback = useCallback(
    (taskID: string, isDone: boolean, todoListID: string) => {
      dispatch(changeTaskStatusAC(taskID, isDone, todoListID));
    },
    [dispatch]
  );

  const changeTextTaskCallback = useCallback(
    (changedTaskName: string, todoListID: string, taskID: string) => {
      dispatch(changeTaskTitleAC(changedTaskName, todoListID, taskID));
    },
    [dispatch]
  );

  const todoListAndTasksForRender = todoListsState.map((el) => {
    let todoListTasks = store.getState().task[el.id]; // присваиваем тот или туду лист в зависимости от id
    let filteredTasksForRender = todoListTasks;

    el.filter === "all"
      ? (filteredTasksForRender = todoListTasks)
      : el.filter === "completed"
      ? (filteredTasksForRender = todoListTasks.filter((el) => el.isDone))
      : (filteredTasksForRender = todoListTasks.filter((el) => !el.isDone));

    return (
      <Grid item key={el.id}>
        <ToDoList
          key={el.id}
          id={el.id}
          title={el.title}
          filter={el.filter}
          tasks={filteredTasksForRender}
          // ==== lists ====
          addNewTodoList={addNewTodoListCallback}
          removeTodoList={removeTodoListCallback}
          changeFilter={changeFilterCallback}
          changeTodoListTitle={changeTodoListTitleCallback}
          //==== tasks ====//
          addNewTask={addTaskCallback}
          removeTaskItem={removeTaskItemCallback}
          changeTaskStatus={changeTaskStatusCallback}
          changeTextTask={changeTextTaskCallback}
        />
      </Grid>
    );
  });

  return (
    <>
      <AddItemForm addItem={addNewTodoListCallback} />
      <Grid
        container
        spacing={4}
        style={{ marginTop: "50px" }}
        className="todoList-items"
      >
        {todoListAndTasksForRender}
      </Grid>
    </>
  );
};
