import React from "react";
import { FilterValuesType } from "../../../App";
import classes from "./Buttons.module.css";

type ButtonsType = {
  filter: FilterValuesType;
  changeFilter: (filter: FilterValuesType) => void;
};

const Buttons: React.FC<ButtonsType> = (props) => {
  const onClickAllButton = () => props.changeFilter("all");
  const onClickActiveButton = () => props.changeFilter("active");
  const onClickCompletedButton = () => props.changeFilter("completed");

  return (
    <div className={classes.controls}>
      <button
        style={props.filter === "all" ? { backgroundColor: "blue" } : {}}
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
