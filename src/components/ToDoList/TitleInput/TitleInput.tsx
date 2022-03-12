import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classes from "./TitleInput.module.css";

type TitleInputPropsType = {
  title: string;
  addTask: (newTask: string) => void;
};

const TitleInput: React.FC<TitleInputPropsType> = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value);
    setError("");
  };

  const onClickAddTaskButtonHandler = () => {
    const newTaskTitleTrim = newTaskTitle.trim(); //trim - удаляет пробелы по краям

    !newTaskTitleTrim.length
      ? setError("Please, input correct task")
      : props.addTask(newTaskTitleTrim);

    setNewTaskTitle("");
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.charCode === 13 ? onClickAddTaskButtonHandler() : console.log("null");
  };

  return (
    <>
      <h3 className={classes.title}>{props.title}</h3>
      <div>
        <input
          className={error.length ? classes.inputError : ""}
          type="text"
          onChange={onChangeInputHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={onClickAddTaskButtonHandler}>+</button>
        <div className={classes.error}>{error}</div>
      </div>
    </>
  );
};

export default TitleInput;
