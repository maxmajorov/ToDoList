import React from "react";
import classes from "./ToDoList.module.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { ListItems } from "../ListItems/ListItems";
import Buttons from "../Buttons/Buttons";
import { TasksType } from "../../reducers/tasks-reducer";
import { FilterValuesType } from "../../reducers/todoList-reducer";

type TodoListPropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TasksType>;
  // ====== ToDoLists =====
  addNewTodoList: (newItem: string) => void;
  removeTodoList: (todoListID: string) => void;
  changeFilter: (filter: FilterValuesType, todoListID: string) => void;
  changeTodoListTitle: (changedTitle: string, todoListID: string) => void;
  //===== TASKS =====
  addNewTask: (newItem: string, todoListID: string) => void;
  removeTaskItem: (taskID: string, todoListID: string) => void;
  changeTaskStatus: (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => void;
  changeTextTask: (
    changedTask: string,
    todoListID: string,
    taskID: string
  ) => void;
};

export const ToDoList: React.FC<TodoListPropsType> = (props) => {
  const removeTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const addNewTaskCallback = (newItem: string) => {
    props.addNewTask(newItem, props.id);
  };

  const changeTodoListTitleCallback = (changeTitle: string) => {
    props.changeTodoListTitle(changeTitle, props.id);
  };

  return (
    <div className={classes.wrapper}>
      <IconButton onClick={removeTodoListHandler}>
        <DeleteForeverIcon />
      </IconButton>
      <AddItemForm
        addItem={addNewTaskCallback}
        title={props.title}
        changeTodoListTitle={changeTodoListTitleCallback}
      />
      <ListItems
        id={props.id}
        tasks={props.tasks}
        removeTaskItem={props.removeTaskItem}
        changeTaskStatus={props.changeTaskStatus}
        onChangeTextTask={props.changeTextTask}
      />
      {/* Если таски отсутствуют то выводится сообщение (прописано в ListItems) и пропадают кнопки, но есть БАГ???*/}
      {/* {props.tasks.length ? ( */}
      <Buttons
        id={props.id}
        filter={props.filter}
        changeFilter={props.changeFilter}
      />
      {/* ) : null} */}
    </div>
  );
};
