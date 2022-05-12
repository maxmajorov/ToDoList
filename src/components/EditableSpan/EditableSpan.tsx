import React, { ChangeEvent, FocusEvent, MouseEvent, useState } from "react";
// import classes from "./EditableSpan.module.css";

type EditableSpanPropsType = {
  text: string;
  onChange: (changedTask: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
  text,
  onChange,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  let spanStyle: string = "";

  const activateEditMode = (event: MouseEvent<HTMLSpanElement>) => {
    setEditMode(true);
    setTitle(text);
  };

  const disactivateEditMode = (event: FocusEvent<HTMLInputElement>) => {
    setEditMode(false);
    onChange(title);
  };

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return editMode ? (
    <input
      value={title}
      onBlur={disactivateEditMode}
      onChange={onChangeTitleHandler}
      autoFocus
    ></input>
  ) : (
    <span onDoubleClick={activateEditMode} className={spanStyle}>
      {text}
    </span>
  );
};
