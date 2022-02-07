import React from "react";
import { FilterValuesType } from "../../../App";
import { TasksType } from "../ListItems/ListItems";
import classes from "./Buttons.module.css";

type ButtonsType = {
  changeFilter: (filter: FilterValuesType) => void;
};

const Buttons: React.FC<TasksType> = (props) => {
  return (
    <div className={classes.controls}>
      <button onClick={() => props.changeFilter("all")}>All</button>
      <button onClick={() => props.changeFilter("active")}>Active</button>
      <button onClick={() => props.changeFilter("completed")}>Completed</button>
    </div>
  );
};

export default Buttons;
