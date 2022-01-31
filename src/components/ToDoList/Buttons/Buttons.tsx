import React from "react";
import classes from "./Buttons.module.css";

const Buttons = () => {
  return (
    <div className={classes.controls}>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  );
};

export default Buttons;
