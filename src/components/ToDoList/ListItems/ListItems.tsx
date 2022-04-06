import React, { ChangeEvent } from "react";
import { TasksType } from "../../../App";
import { EditableSpan } from "../EditableSpan/EditableSpan";
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
  onChangeTextTask: (
    changedTask: string,
    todoListID: string,
    taskID: string
  ) => void;
};

export const ListItems: React.FC<ListItemsPropsType> = (props) => {
  const listItems = props.tasks.map((task) => {
    const onChangeTextTaskHandler = (changedTask: string) => {
      props.onChangeTextTask(changedTask, props.id, task.id);
    };

    return (
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
          <EditableSpan
            text={task.text}
            changeTextTask={onChangeTextTaskHandler}
          />
          {/* <span>{task.text}</span> */}
        </div>
        <button onClick={() => props.removeTaskItem(task.id, props.id)}>
          x
        </button>
      </li>
    );
  });
  return listItems.length ? (
    <ul>{listItems}</ul>
  ) : (
    <span>No available todoes items</span>
  );
  //Условный рендеринг, если невыполнены таски то выводим сообщение
};
