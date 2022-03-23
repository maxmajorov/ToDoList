import React, { ChangeEvent } from "react";
import { TasksType } from "../../../App";
import classes from "./ListItems.module.css";

type ListItemsPropsType = {
  id: string;
  tasks: Array<TasksType>;
  removeTaskItem: (taskID: string, todoListID: string) => void;
  changeTaskStatus: (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => void;
};

const ListItems: React.FC<ListItemsPropsType> = (props) => {
  const listItems = props.tasks.map((task) => (
    <li
      key={task.id}
      className={`${classes.task_item} ${
        task.isDone ? classes.completed_task : ""
      }`}
    >
      <div>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(
              task.id,
              event.currentTarget.checked,
              props.id
            )
          }
          //кроме id передаем и isDone.тк функци не знает что сидит в isDone.
          //так тоже работает onClick={() => props.changeTaskStatus(task.id, task.isDone)}
        />
        <span>{task.text}</span>
      </div>
      <button onClick={() => props.removeTaskItem(task.id, props.id)}>x</button>
    </li>
  ));
  return listItems.length ? (
    <ul>{listItems}</ul>
  ) : (
    <span>No available todoes items</span>
  );
  //Условный рендеринг, если невыполнены таски то выводим сообщение
};

export default ListItems;
