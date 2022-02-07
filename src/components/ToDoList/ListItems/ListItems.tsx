import React from "react";
// import classes from "./ListItems.module.css";

export type TasksType = {
  id: number;
  text: string;
  isDone: boolean;
};

type ListItemsPropsType = {
  tasks: Array<TasksType>;
  removeTaskItem: (taskID: number) => void;
};

const ListItems: React.FC<ListItemsPropsType> = (props) => {
  return (
    <ul>
      {props.tasks.map((task) => (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone} />
          <span>{task.text}</span>
          <button onClick={() => props.removeTaskItem(task.id)}>+</button>
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
