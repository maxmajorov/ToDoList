import React, { useCallback, useEffect } from "react";
import { TaskStatuses, TaskType } from "../../api/types";
import IconButton from "@mui/material/IconButton";
import { DeleteForever } from "@mui/icons-material";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import classes from "./ToDoList.module.css";
import Buttons from "../../components/common/Buttons/Buttons";
import { Task } from "../Task/Task";
import { fetchTasksTC } from "../../store/reducers/tasks-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  FilterValuesType,
  TodolistDomainType,
} from "../../store/reducers/todoList-reducer";
import { appStatusSelector } from "../../store/reducers/app-reducer";

type TodoPropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  changeFilter: (id: string, filter: FilterValuesType) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    id: string,
    status: TaskStatuses,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export const Todolist: React.FC<TodoPropsType> = React.memo((props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(appStatusSelector);

  useEffect(() => {
    dispatch(fetchTasksTC(props.todolist.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props.todolist.id, props.changeTodolistTitle]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter(props.todolist.id, "all"),
    [props.todolist.id, props.changeFilter]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter(props.todolist.id, "active"),
    [props.todolist.id, props.changeFilter]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter(props.todolist.id, "completed"),
    [props.todolist.id, props.changeFilter]
  );

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }
  return (
    <div className={classes.wrapper}>
      <h3>
        <EditableSpan
          value={props.todolist.title}
          onChange={changeTodolistTitle}
        />
        <IconButton onClick={removeTodolist} disabled={status === "loading"}>
          <DeleteForever />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} entityStatus={status} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
          />
        ))}
      </div>
      <Buttons
        id={props.todolist.id}
        filter={props.filter}
        changeFilter={props.changeFilter}
      />
    </div>
  );
});
