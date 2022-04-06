import React from "react";
import { FilterValuesType, TasksType } from "../../App";
import Buttons from "./Buttons/Buttons";
import { ListItems } from "./ListItems/ListItems";
import { AddItemForm } from "./AddItemForm/AddItemForm";
import classes from "./ToDoList.module.css";

type TodoListPropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TasksType>;
  addTask: (newItem: string, id: string) => void;
  removeTaskItem: (taskID: string, todoListID: string) => void;
  changeFilter: (filter: FilterValuesType, todoListID: string) => void;
  changeTaskStatus: (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => void;
  removeTodoList: (todoListID: string) => void;
  onChangeTextTask: (
    changedTask: string,
    todoListID: string,
    taskID: string
  ) => void;
  changeTodoListTitle: (changedTitle: string, todoListID: string) => void;
};

export const ToDoList: React.FC<TodoListPropsType> = (props) => {
  const removeTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (newItem: string) => {
    props.addTask(newItem, props.id);
  };

  const changeTodoListTitleCallback = (changeTitle: string) => {
    props.changeTodoListTitle(changeTitle, props.id);
  };

  return (
    <div className={classes.wrapper}>
      <button onClick={removeTodoListHandler}>x</button>
      <AddItemForm
        addItem={addTask}
        title={props.title}
        changeTodoListTitle={changeTodoListTitleCallback}
      />
      <ListItems
        id={props.id}
        tasks={props.tasks}
        removeTaskItem={props.removeTaskItem}
        changeTaskStatus={props.changeTaskStatus}
        onChangeTextTask={props.onChangeTextTask}
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
