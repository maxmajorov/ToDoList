import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import classes from "./AddItemForm.module.css";

type AddItemFormPropsType = {
  title: string;
  addItem: (newItem: string) => void;
  changeTodoListTitle: (changeTitle: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = ({
  title,
  addItem,
  changeTodoListTitle,
}) => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
    setError("");
  };

  const onClickAddTaskButtonHandler = () => {
    const newTitleTrim = newTitle.trim(); //trim - удаляет пробелы по краям

    !newTitleTrim.length
      ? setError("Please, input correct task")
      : addItem(newTitleTrim);

    setNewTitle("");
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.charCode === 13 ? onClickAddTaskButtonHandler() : console.log("null");
  };

  const onChangeTodoTitleCallBack = (changedTodosTitle: string) => {
    changeTodoListTitle(changedTodosTitle);
    console.log(changedTodosTitle, newTitle);
  };
  return (
    <div>
      <h3 className={classes.title}>
        <EditableSpan text={title} changeTextTask={onChangeTodoTitleCallBack} />
      </h3>
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
    </div>
  );
};
