import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classes from "./TitleInput.module.css";

type TitleInputPropsType = {
  title: string;
  addTask: (newTask: string) => void;
};

const TitleInput: React.FC<TitleInputPropsType> = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value);
  };

  const onClickAddTaskButtonHandler = () => {
    props.addTask(newTaskTitle);
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
          type="text"
          onChange={onChangeInputHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={onClickAddTaskButtonHandler}>+</button>
      </div>
    </>
  );
};

export default TitleInput;
