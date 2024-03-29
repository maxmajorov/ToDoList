import React, { ChangeEvent, FocusEvent, MouseEvent, useState } from "react";
import { RequestStatusType } from "../../store/reducers/app-reducer";
// import classes from "./EditableSpan.module.css";

type EditableSpanPropsType = {
  value: string;
  onChange: (changedTask: string) => void;
  entityTaskStatus?: RequestStatusType;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
  value,
  onChange,
  entityTaskStatus,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  let spanStyle: string = "";

  const activateEditMode = (event: MouseEvent<HTMLSpanElement>) => {
    setEditMode(true);
    setTitle(value);
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
      disabled={entityTaskStatus === "loading"}
    ></input>
  ) : (
    <span onDoubleClick={activateEditMode} className={spanStyle}>
      {value}
    </span>
  );
};
