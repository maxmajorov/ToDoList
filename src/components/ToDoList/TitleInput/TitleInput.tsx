import React from "react";
import classes from "./TitleInput.module.css";

type TitleInputPropsType = {
  title: string;
};

const TitleInput: React.FC<TitleInputPropsType> = (props) => {
  return (
    <>
      <h3 className={classes.title}>{props.title}</h3>
      <div>
        <input type="text" />
        <span>+</span>
      </div>
    </>
  );
};

export default TitleInput;
