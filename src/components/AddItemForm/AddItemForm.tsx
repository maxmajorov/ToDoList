import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classes from "./AddItemForm.module.css";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";

type AddItemFormPropsType = {
  addItem: (newItem: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
  ({ addItem }) => {
    console.log("additem form render");
    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(event.currentTarget.value);
    };

    const onClickAddTaskHandler = () => {
      const newTitleTrim = newTitle.trim(); //trim - удаляет пробелы по краям

      if (newTitleTrim.length) {
        addItem(newTitleTrim);
        setNewTitle("");
      } else setError("Please, input correct task");
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      event.charCode === 13 ? onClickAddTaskHandler() : setError(null);
    };

    return (
      <div className={classes.inner}>
        <div>
          <TextField
            id="outlined-textarea"
            value={newTitle}
            label="New item"
            placeholder="enter the text"
            multiline
            variant="outlined"
            type="text"
            onChange={onChangeInputHandler}
            onKeyPress={onKeyPressHandler}
            color={"primary"}
            // helperText={error} разобраться как сделать чтоб крассным цветом выводилось
          />
          <IconButton onClick={onClickAddTaskHandler}>
            <AddIcon style={{ fontSize: 30 }} color={"secondary"} />
          </IconButton>
          <div className={classes.error}>{error}</div>
        </div>
      </div>
    );
  }
);
