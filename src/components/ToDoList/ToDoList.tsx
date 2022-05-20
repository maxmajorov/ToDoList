import React, { useCallback } from "react";
import classes from "./ToDoList.module.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { ListItems } from "../ListItems/ListItems";
import Buttons from "../Buttons/Buttons";
import { TasksType } from "../../reducers/tasks-reducer";
import { FilterValuesType } from "../../reducers/todoList-reducer";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type TodoListPropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TasksType>;
  // ====== ToDoLists =====
  addNewTodoList: (newItem: string) => void;
  removeTodoList: (todoListID: string) => void;
  changeFilter: (filter: FilterValuesType, todoListID: string) => void;
  changeTodoListTitle: (changedTitle: string, todoListID: string) => void;
  //===== TASKS =====
  addNewTask: (newItem: string, todoListID: string) => void;
  removeTaskItem: (taskID: string, todoListID: string) => void;
  changeTaskStatus: (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => void;
  changeTextTask: (
    changedTask: string,
    todoListID: string,
    taskID: string
  ) => void;
};

export const ToDoList: React.FC<TodoListPropsType> = React.memo((props) => {
  console.log("todolist", props);

  const removeTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const addNewTaskCallback = useCallback(
    (newItem: string) => {
      props.addNewTask(newItem, props.id);
    },
    [props.addNewTask, props.id] // нужно деструктурировать
  );

  const changeTodolistTitle = useCallback(
    (changeTitle: string) => {
      props.changeTodoListTitle(changeTitle, props.id);
    },
    [props]
  );

  let filteredTasksForRender = props.tasks;
  // фильтрацию производим в компоненте, чтоб завязать на props и
  // соответственно можно оптимизировать контролируя изменение props

  props.filter === "all"
    ? (filteredTasksForRender = props.tasks)
    : props.filter === "completed"
    ? (filteredTasksForRender = props.tasks.filter((el) => el.isDone))
    : (filteredTasksForRender = props.tasks.filter((el) => !el.isDone));

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>
        <EditableSpan text={props.title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={removeTodoListHandler}>
        <DeleteForeverIcon />
      </IconButton>
      <AddItemForm addItem={addNewTaskCallback} />
      <ListItems
        id={props.id}
        tasks={filteredTasksForRender}
        removeTaskItem={props.removeTaskItem}
        changeTaskStatus={props.changeTaskStatus}
        onChangeTextTask={props.changeTextTask}
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
});
