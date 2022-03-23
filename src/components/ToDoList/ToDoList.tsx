import React from "react";
import { FilterValuesType, TasksType } from "../../App";
import Buttons from "./Buttons/Buttons";
import ListItems from "./ListItems/ListItems";
import TitleInput from "./TitleInput/TitleInput";
import classes from "./ToDoList.module.css";

type TodoListPropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TasksType>;
  addTask: (newTask: string, todoListID: string) => void;
  removeTaskItem: (taskID: string, todoListID: string) => void;
  changeFilter: (filter: FilterValuesType, todoListID: string) => void;
  changeTaskStatus: (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => void;
  removeTodoList: (todoListID: string) => void;
};

const ToDoList: React.FC<TodoListPropsType> = (props) => {
  return (
    <div className={classes.wrapper}>
      <TitleInput
        id={props.id}
        addTask={props.addTask}
        title={props.title}
        removeTodoList={props.removeTodoList}
      />
      <ListItems
        id={props.id}
        tasks={props.tasks}
        removeTaskItem={props.removeTaskItem}
        changeTaskStatus={props.changeTaskStatus}
      />

      {/* Если таски отсутствуют то выводится сообщение (прописано в ListItems) и пропадают кнопки, но есть БАГ???*/}
      {/* {props.tasks.length ? ( */}
      <Buttons
        id={props.id}
        filter={props.filter}
        changeFilter={props.changeFilter}
      />
      {/* ) : null} */}
    </div>
  );
};

export default ToDoList;
