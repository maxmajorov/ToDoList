import React from "react";
import { FilterValuesType, TasksType } from "../../App";
import Buttons from "./Buttons/Buttons";
import ListItems from "./ListItems/ListItems";
import TitleInput from "./TitleInput/TitleInput";
import classes from "./ToDoList.module.css";

type TodoListPropsType = {
  title: string;
  tasks: Array<TasksType>;
  addTask: (newTask: string) => void;
  removeTaskItem: (taskID: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
};

const ToDoList: React.FC<TodoListPropsType> = (props) => {
  return (
    <div className={classes.wrapper}>
      <TitleInput addTask={props.addTask} title={props.title} />
      <ListItems tasks={props.tasks} removeTaskItem={props.removeTaskItem} />
      <Buttons changeFilter={props.changeFilter} />
    </div>
  );
};

export default ToDoList;
