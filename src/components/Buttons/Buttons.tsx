import React, { useCallback } from "react";
import { Button } from "@mui/material";
import classes from "./Buttons.module.css";
import { FilterValuesType } from "../../store/reducers/todoList-reducer";

type ButtonsType = {
  id: string;
  filter: FilterValuesType;
  changeFilter: (filter: FilterValuesType, todoListID: string) => void;
};

const Buttons: React.FC<ButtonsType> = ({ id, filter, changeFilter }) => {
  const onClickAllButton = useCallback(
    () => changeFilter("all", id),
    [changeFilter, id]
  );
  const onClickActiveButton = useCallback(
    () => changeFilter("active", id),
    [changeFilter, id]
  );
  const onClickCompletedButton = useCallback(
    () => changeFilter("completed", id),
    [changeFilter, id]
  );

  return (
    <div className={classes.controls}>
      <Button
        style={filter === "all" ? { backgroundColor: "aqua" } : {}}
        onClick={onClickAllButton}
      >
        All
      </Button>
      <Button
        style={filter === "active" ? { backgroundColor: "red" } : {}}
        onClick={onClickActiveButton}
      >
        Active
      </Button>
      <Button
        style={filter === "completed" ? { backgroundColor: "green" } : {}}
        onClick={onClickCompletedButton}
      >
        Completed
      </Button>
    </div>
  );
};

export default Buttons;
