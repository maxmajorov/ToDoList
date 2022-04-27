import React from "react";
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

export const ToDoListContainer = () => {
  const todoListsState = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();

  // ====== FUNCTION FOR CHANGING TODOLIST ======

  const addNewTodoListCallback = (newItem: string) => {
    const newTodoListID = v1();
    dispatch(addNewTodoListAC(newItem, newTodoListID));
    dispatch(addEmptyArrayTaskAC(newTodoListID));
  };

  const removeTodoListCallback = (todoListID: string) => {
    dispatch(removeTodoListAC(todoListID));
  };

  const changeFilterCallback = (
    filter: FilterValuesType,
    todoListID: string
  ) => {
    dispatch(changeFilterAC(todoListID, filter));
  };

  const changeTodoListTitleCallback = (
    changedTitle: string,
    todoListID: string
  ) => {
    dispatch(changeTodoListTitleAC(changedTitle, todoListID));
  };

  // ====== FUNCTION FOR CHANGING TASKS_ITEM======

  const addTaskCallback = (newTaskName: string, todoListID: string) => {
    dispatch(addNewTaskAC(newTaskName, todoListID));
  };

  const removeTaskItemCallback = (taskID: string, todoListID: string) => {
    dispatch(removeTaskAC(taskID, todoListID));
  };

  const changeTaskStatusCallback = (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => {
    dispatch(changeTaskStatusAC(taskID, isDone, todoListID));
  };

  const changeTextTaskCallback = (
    changedTaskName: string,
    todoListID: string,
    taskID: string
  ) => {
    dispatch(changeTaskTitleAC(changedTaskName, todoListID, taskID));
  };

  const todoListAndTasksForRender = todoListsState.map((el) => {
    let todoListTasks = store.getState().task[el.id]; // присваиваем тот или туду лист в зависимости от id
    let filteredTasksForRender = todoListTasks;

    el.filter === "all"
      ? (filteredTasksForRender = todoListTasks)
      : el.filter === "completed"
      ? (filteredTasksForRender = todoListTasks.filter((el) => el.isDone))
      : (filteredTasksForRender = todoListTasks.filter((el) => !el.isDone));

    return (
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
    );
  });

  return (
    <>
      <AddItemForm
        title=""
        addItem={addNewTodoListCallback}
        changeTodoListTitle={() => {}}
      />
      <div className="todoList-items">{todoListAndTasksForRender}</div>
    </>
  );
};
