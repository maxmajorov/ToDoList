import React from "react";
import { FilterValuesType } from "../../App";
import Buttons from "./Buttons/Buttons";
import ListItems, { TasksType } from "./ListItems/ListItems";
import TitleInput from "./TitleInput/TitleInput";
import classes from "./ToDoList.module.css";

type TodoListPropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTaskItem: (taskID: number) => void;
  changeFilter: (filter: FilterValuesType) => void;
};

const ToDoList: React.FC<TodoListPropsType> = (props) => {
  return (
    <div className={classes.wrapper}>
      <TitleInput title={props.title} />
      <ListItems tasks={props.tasks} removeTaskItem={props.removeTaskItem} />
      <Buttons changeFilter={props.changeFilter} />
    </div>
  );
};

export default ToDoList;
