import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import classes from "./AddItemForm.module.css";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";

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
    <div className={classes.inner}>
      <h3 className={classes.title}>
        <EditableSpan text={title} changeTextTask={onChangeTodoTitleCallBack} />
      </h3>
      <div>
        <TextField
          id="outlined-textarea"
          label="New item"
          placeholder="enter the text"
          multiline
          variant="outlined"
          className={error.length ? classes.inputError : ""}
          type="text"
          onChange={onChangeInputHandler}
          onKeyPress={onKeyPressHandler}
          color={"primary"}
        />
        <IconButton onClick={onClickAddTaskButtonHandler}>
          <AddIcon style={{ fontSize: 30 }} color={"secondary"} />
        </IconButton>
        <div className={classes.error}>{error}</div>
      </div>
    </div>
  );
};
