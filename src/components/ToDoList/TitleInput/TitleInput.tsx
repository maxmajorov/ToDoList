import React from "react";
import classes from "./TitleInput.module.css";

type TitleInputPropsType = {
  title: string;
};

const TitleInput = (props: TitleInputPropsType) => {
  return (
    <>
      <h3 className={classes.title}>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
    </>
  );
};

export default TitleInput;
