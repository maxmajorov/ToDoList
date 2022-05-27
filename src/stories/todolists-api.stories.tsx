import React, { useEffect, useState } from "react";
import { todoAPI } from "../api/api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todoAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoAPI.createTodolist().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "b3d6df57-587d-4b94-ab32-b035eda0f651";

    todoAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const payload = {
      todolistId: "811b6e10-300e-4ab7-a3d7-17fd469e490d",
      title: "REACT + AXIOS",
    };

    todoAPI.updateTodolistTitle(payload).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
