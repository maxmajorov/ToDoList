import React, { useState } from "react";
import "./App.css";
import ToDoList from "../src/components/ToDoList/ToDoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type TasksType = {
  id: string;
  text: string;
  isDone: boolean;
};

const App = () => {
  const [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), text: "HTML", isDone: true },
    { id: v1(), text: "CSS", isDone: true },
    { id: v1(), text: "React", isDone: false },
    { id: v1(), text: "TypeScript", isDone: false },
    { id: v1(), text: "Jest", isDone: true },
  ]);

  console.log(tasks);

  const [filter, setFilter] = useState<FilterValuesType>("all");

  const getFilteredTasksForRender = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((el) => el.isDone);
      case "active":
        return tasks.filter((el) => !el.isDone);
      default:
        return tasks;
    }
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const filteredTasksForRender = getFilteredTasksForRender();

  const removeTaskItem = (taskID: string) => {
    const filteredTasks = tasks.filter((el) => el.id !== taskID);
    setTasks(filteredTasks);
  };

  const addTask = (newTask: string) => {
    const addnewTask = { id: v1(), text: newTask, isDone: false };
    const newArrayTasks = [addnewTask, ...tasks];
    setTasks(newArrayTasks);
  };

  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    setTasks(
      tasks.map((el) => (el.id === taskID ? { ...el, isDone: !el.isDone } : el))
    );
  };

  return (
    <div className="App">
      <ToDoList
        title="What to learn"
        filter={filter}
        tasks={filteredTasksForRender}
        addTask={addTask}
        removeTaskItem={removeTaskItem}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
      {/* <ToDoList
        title="Day's tasks"
        tasks={tasks[1]}
        removeTaskItem={removeTaskItem}
      /> */}
    </div>
  );
};

export default App;
