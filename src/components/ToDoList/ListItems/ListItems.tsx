import React from "react";
import { TasksType } from "../../../App";
// import classes from "./ListItems.module.css";

type ListItemsPropsType = {
  tasks: Array<TasksType>;
  removeTaskItem: (taskID: string) => void;
};

const ListItems: React.FC<ListItemsPropsType> = (props) => {
  const listItems = props.tasks.map((task) => (
    <li key={task.id}>
      <input type="checkbox" checked={task.isDone} />
      <span>{task.text}</span>
      <button onClick={() => props.removeTaskItem(task.id)}>+</button>
    </li>
  ));
  return <ul>{listItems}</ul>;
};

export default ListItems;
