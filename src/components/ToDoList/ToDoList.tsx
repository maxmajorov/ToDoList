import React from "react";
import Buttons from "./Buttons/Buttons";
import ListItems from "./ListItems/ListItems";
import TitleInput from "./TitleInput/TitleInput";
import classes from "./ToDoList.module.css";

type TaskType = {
  id: number;
  text: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
};

const ToDoList = (props: TodoListPropsType) => {
  return (
    <div className={classes.wrapper}>
      <TitleInput title={props.title} />
      <ListItems tasks={props.tasks} />
      <Buttons />
    </div>
  );
};

export default ToDoList;
