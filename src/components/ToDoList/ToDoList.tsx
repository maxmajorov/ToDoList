import React, { useCallback, useEffect } from "react";
import { TaskStatuses, TaskType } from "../../api/api";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { DeleteForever } from "@mui/icons-material";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { FilterValuesType } from "../../store/reducers/todoList-reducer";
import { fetchTasksTC } from "../../store/thunks";
import classes from "./ToDoList.module.css";
import Buttons from "../Buttons/Buttons";
import { Task } from "../Task/Task";
import { RequestStatusType } from "../../store/reducers/app-reducer";

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  entityStatus: RequestStatusType;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
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

export const Todolist = React.memo(function (props: PropsType) {
  console.log("Todolist called");

  const dispatch = useDispatch();
  useEffect(() => {
    const thunk = fetchTasksTC(props.id);
    dispatch(thunk);
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props.id, props.changeTodolistTitle]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.id, props.changeFilter]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.id, props.changeFilter]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.id, props.changeFilter]
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
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton
          onClick={removeTodolist}
          disabled={props.entityStatus === "loading"}
        >
          <DeleteForever />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} entityStatus={props.entityStatus} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
          />
        ))}
      </div>
      <Buttons
        id={props.id}
        filter={props.filter}
        changeFilter={props.changeFilter}
      />
    </div>
  );
});
