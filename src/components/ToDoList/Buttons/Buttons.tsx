import React from "react";
import { FilterValuesType } from "../../../App";
import classes from "./Buttons.module.css";

type ButtonsType = {
  id: string;
  filter: FilterValuesType;
  changeFilter: (filter: FilterValuesType, todoListID: string) => void;
};

const Buttons: React.FC<ButtonsType> = (props) => {
  const onClickAllButton = () => props.changeFilter("all", props.id);
  const onClickActiveButton = () => props.changeFilter("active", props.id);
  const onClickCompletedButton = () =>
    props.changeFilter("completed", props.id);

  return (
    <div className={classes.controls}>
      <button
        style={props.filter === "all" ? { backgroundColor: "aqua" } : {}}
        onClick={onClickAllButton}
      >
        All
      </button>
      <button
        style={props.filter === "active" ? { backgroundColor: "red" } : {}}
        onClick={onClickActiveButton}
      >
        Active
      </button>
      <button
        style={props.filter === "completed" ? { backgroundColor: "green" } : {}}
        onClick={onClickCompletedButton}
      >
        Completed
      </button>
    </div>
  );
};

export default Buttons;
