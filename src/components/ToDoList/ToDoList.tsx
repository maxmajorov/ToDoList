import React from "react";
import Buttons from "./Buttons/Buttons";
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
      <h3 className={classes.title}>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => (
          <li>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
      <Buttons />
    </div>
  );
};

export default ToDoList;
