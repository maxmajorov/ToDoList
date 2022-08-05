import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import classes from "./AddItemForm.module.css";
import { RequestStatusType } from "../../store/reducers/app-reducer";

type AddItemFormPropsType = {
  addItem: (newItem: string) => void;
  entityStatus?: string;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
  ({ addItem, entityStatus }) => {
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
      <>
        <div className={classes.inner}>
          <TextField
            id="outlined-textarea"
            value={newTitle}
            label="New item"
            placeholder="enter the text"
            variant="outlined"
            type="text"
            onChange={onChangeInputHandler}
            onKeyPress={onKeyPressHandler}
            color={"primary"}
            disabled={entityStatus === "loading"}
            // helperText={error} разобраться как сделать чтоб крассным цветом выводилось
          />
          <IconButton
            onClick={onClickAddTaskHandler}
            disabled={entityStatus === "loading"}
          >
            <AddBox
              color={entityStatus === "loading" ? "disabled" : "primary"}
            />
          </IconButton>
        </div>
        <div className={classes.error}>{error}</div>
      </>
    );
  }
);
