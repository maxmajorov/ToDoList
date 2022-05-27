import React, { useEffect, useState } from "react";
import { taskAPI } from "../api/api";

export default {
  title: "API - TASKS",
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "811b6e10-300e-4ab7-a3d7-17fd469e490d";
    taskAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const payload = {
      todolistId: "811b6e10-300e-4ab7-a3d7-17fd469e490d",
      title: "LEARN AXIOS",
    };

    taskAPI.createTask(payload).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const payload = {
      todolistId: "811b6e10-300e-4ab7-a3d7-17fd469e490d",
      taskId: "9cf79f71-ce03-4d28-97e5-d994451e4af9",
    };

    taskAPI.deleteTask(payload).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const payload = {
      todolistId: "811b6e10-300e-4ab7-a3d7-17fd469e490d",
      taskId: "02b67626-4733-4974-9cb1-dc71cf3bdfa9",
      title: "REACT + AXIOS UPDATE",
    };

    taskAPI.updateTaskTitle(payload).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
