import React from "react";
// import classes from "./ListItems.module.css";

type TaskType = {
  id: number;
  text: string;
  isDone: boolean;
};

type ListItemsPropsType = {
  tasks: Array<TaskType>;
};

const ListItems = (props: ListItemsPropsType) => {
  return (
    <ul>
      {props.tasks.map((task) => (
        <li>
          <input type="checkbox" checked={task.isDone} />
          <span>{task.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
