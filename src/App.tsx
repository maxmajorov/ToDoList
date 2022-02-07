import React, { useState } from "react";
import "./App.css";
import ToDoList from "../src/components/ToDoList/ToDoList";
import { TasksType } from "./components/ToDoList/ListItems/ListItems";

export type FilterValuesType = "all" | "active" | "complited";

const App = () => {
  const [tasks, setTasks] = useState<Array<TasksType>>([
    { id: 1, text: "HTML", isDone: true },
    { id: 2, text: "CSS", isDone: true },
    { id: 3, text: "React", isDone: true },
    { id: 4, text: "TypeScript", isDone: false },
    { id: 5, text: "Jest", isDone: true },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>("all");

  const getFilteredTasksForRender = () => {
    switch (filter) {
      case "complited":
        return tasks.filter((el) => el.isDone === true);
      case "active":
        return tasks.filter((el) => el.isDone === false);
      default:
        return tasks;
    }
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const filteredTasksForRender = getFilteredTasksForRender();

  const removeTaskItem = (taskID: number) => {
    const filteredTasks = tasks.filter((el) => el.id !== taskID);
    setTasks(filteredTasks);
  };

  return (
    <div className="App">
      <ToDoList
        title="What to learn"
        tasks={filteredTasksForRender}
        removeTaskItem={removeTaskItem}
        changeFilter={changeFilter}
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
