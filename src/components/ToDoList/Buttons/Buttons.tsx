import React from "react";
import { FilterValuesType } from "../../../App";
import classes from "./Buttons.module.css";

type ButtonsType = {
  changeFilter: (filter: FilterValuesType) => void;
};

const Buttons: React.FC<ButtonsType> = (props) => {
  const onClickAllButton = () => props.changeFilter("all");
  const onClickActiveButton = () => props.changeFilter("active");
  const onClickCompletedButton = () => props.changeFilter("completed");
  return (
    <div className={classes.controls}>
      <button onClick={onClickAllButton}>All</button>
      <button onClick={onClickActiveButton}>Active</button>
      <button onClick={onClickCompletedButton}>Completed</button>
    </div>
  );
};

export default Buttons;
