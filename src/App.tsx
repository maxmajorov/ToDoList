import React, { useState } from "react";
import "./App.css";
import { ToDoList } from "../src/components/ToDoList/ToDoList";
import { v1 } from "uuid";
import { AddItemForm } from "./components/ToDoList/AddItemForm/AddItemForm";
import { TodoAppBar } from "./components/ToDoList/AppBar/AppBar";

export type FilterValuesType = "all" | "active" | "completed";
export type TasksType = {
  id: string;
  text: string;
  isDone: boolean;
};

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [key: string]: Array<TasksType>;
};

const App = () => {
  let todoListID_1 = v1();
  let todoListID_2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListID_1, title: "What to learn", filter: "all" },
    { id: todoListID_2, title: "What to buy", filter: "all" },
  ]);

  const [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListID_1]: [
      { id: v1(), text: "HTML", isDone: true },
      { id: v1(), text: "CSS", isDone: true },
      { id: v1(), text: "React", isDone: false },
      { id: v1(), text: "TypeScript", isDone: false },
    ],
    [todoListID_2]: [
      { id: v1(), text: "Milk", isDone: true },
      { id: v1(), text: "Bread", isDone: true },
      { id: v1(), text: "Salt", isDone: false },
    ],
  });

  const changeFilter = (filter: FilterValuesType, todoListID: string) => {
    let todoList = todoLists.find((el) => el.id === todoListID);

    if (todoList) {
      todoList.filter = filter;
      setTodoLists([...todoLists]);
    }
  };

  const removeTaskItem = (taskID: string, todoListID: string) => {
    const task = tasksObj[todoListID]; //находим по ID нужный todoList
    const filteredTasks = task.filter((el) => el.id !== taskID); // фильтруем его
    tasksObj[todoListID] = filteredTasks; // перезаписываем его отфильтрованными тасками
    setTasks({ ...tasksObj }); // не мутируя исходник записываем
  };

  const addTask = (newTask: string, todoListID: string) => {
    const task = tasksObj[todoListID]; //находим по ID нужный todoList
    const addnewTask = { id: v1(), text: newTask, isDone: false }; //создаем новую таску
    const newArrayTasks = [addnewTask, ...task]; // добавляем новую таску
    tasksObj[todoListID] = newArrayTasks; // перезаписываем с учетом новой таски
    setTasks({ ...tasksObj }); // не мутируя исходник записываем
  };

  const addNewToDoList = (newTodosName: string) => {
    const todoListID = v1();
    const newTodoList: TodoListType = {
      // Создаем новый todolist
      id: todoListID,
      title: newTodosName,
      filter: "all",
    };
    setTodoLists([...todoLists, newTodoList]); //Не мутируя исходник добавляем новый
    setTasks({
      ...tasksObj,
      [todoListID]: [],
    }); //Также не мутируя исходник тасок добавляем новый список тасок который изначально пустой
  };

  const changeTaskStatus = (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => {
    const task = tasksObj[todoListID]; //находим по ID нужный todoList
    tasksObj[todoListID] = task.map(
      (el) => (el.id === taskID ? { ...el, isDone: !el.isDone } : el) // перезаписываем с учетом нового статуса таски
    );

    setTasks({ ...tasksObj }); // не мутируя исходник записываем
  };

  const removeTodoList = (todoListID: string) => {
    const withoutRemoveTodo = todoLists.filter((el) => el.id !== todoListID); //фильтруем листы по ID
    setTodoLists(withoutRemoveTodo); //устанавливаем с учетом отвильтрованных листов
    delete tasksObj[todoListID]; //также удаляем задачи для этого листа
    setTasks({ ...tasksObj }); // также установливаем таски заново с учетом удаленных
  };

  const onChangeTextTaskCallback = (
    changedTask: string,
    todoListID: string,
    taskID: string
  ) => {
    const listByTodoListID = tasksObj[todoListID]; //находим по ID нужный todoList
    const newTaskAfterChangingByTaskID = listByTodoListID.map((task) =>
      task.id === taskID ? (task.text = changedTask) : task
    ); //Ищем нужную таску и сразу же ее присваиваем
    console.log(newTaskAfterChangingByTaskID);
    setTasks({ ...tasksObj }); // не мутируя исходник записываем
  };

  const onChangeTodosTitleCallback = (
    changedTitle: string,
    todoListID: string
  ) => {
    const todoListForChanging = todoLists.map((todoList) =>
      todoList.id === todoListID ? (todoList.title = changedTitle) : todoList
    );
    console.log("changed title", todoListForChanging);
    setTodoLists([...todoLists]);
  };

  const todoListAndTasksForRender = todoLists.map((el) => {
    let todoListTasks = tasksObj[el.id]; // присваиваем тот или туду лист в зависимости от id
    let filteredTasksForRender = todoListTasks;

    el.filter === "all"
      ? (filteredTasksForRender = todoListTasks)
      : el.filter === "completed"
      ? (filteredTasksForRender = todoListTasks.filter((el) => el.isDone))
      : (filteredTasksForRender = todoListTasks.filter((el) => !el.isDone));

    return (
      <ToDoList
        key={el.id}
        id={el.id}
        title={el.title}
        filter={el.filter}
        tasks={filteredTasksForRender}
        addTask={addTask}
        removeTaskItem={removeTaskItem}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
        removeTodoList={removeTodoList}
        onChangeTextTask={onChangeTextTaskCallback}
        changeTodoListTitle={onChangeTodosTitleCallback}
      />
    );
  });

  return (
    <>
      <TodoAppBar />
      <div className="App">
        <AddItemForm
          addItem={addNewToDoList}
          title="Add new ToDoList"
          changeTodoListTitle={() => {}}
        />
        <div className="todoList-items">{todoListAndTasksForRender}</div>
      </div>
    </>
  );
};

export default App;
