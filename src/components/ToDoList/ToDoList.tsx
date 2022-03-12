import React from "react";
import { FilterValuesType, TasksType } from "../../App";
import Buttons from "./Buttons/Buttons";
import ListItems from "./ListItems/ListItems";
import TitleInput from "./TitleInput/TitleInput";
import classes from "./ToDoList.module.css";

type TodoListPropsType = {
  title: string;
  filter: FilterValuesType;
  tasks: Array<TasksType>;
  addTask: (newTask: string) => void;
  removeTaskItem: (taskID: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  changeTaskStatus: (taskID: string, isDone: boolean) => void;
};

const ToDoList: React.FC<TodoListPropsType> = (props) => {
  return (
    <div className={classes.wrapper}>
      <TitleInput addTask={props.addTask} title={props.title} />
      <ListItems
        tasks={props.tasks}
        removeTaskItem={props.removeTaskItem}
        changeTaskStatus={props.changeTaskStatus}
      />

      {/* Если таски отсутствуют то выводится сообщение (прописано в ListItems) и пропадают кнопки, но есть БАГ???*/}
      {/* {props.tasks.length ? ( */}
      <Buttons filter={props.filter} changeFilter={props.changeFilter} />
      {/* ) : null} */}
    </div>
  );
};

export default ToDoList;
