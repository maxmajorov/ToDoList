import { v1 } from "uuid";
import {
  ActionsType,
  ADD_NEW_TASK,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_TITLE,
  REMOVE_TASK,
} from "../actions/tasks-actions";
import { todoListID_1, todoListID_2 } from "./todoList-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TasksType = {
  id: string;
  text: string;
  isDone: boolean;
};

type TaskStateType = {
  [key: string]: Array<TasksType>;
};

let initialState: TaskStateType = {
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
};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case ADD_NEW_TASK: {
      const todoList = state[action.todoListID]; //находим по ID нужный todoList
      const addnewTask = { id: v1(), text: action.newItem, isDone: false }; //создаем новую таску
      const newArrayTasks = [addnewTask, ...todoList]; // добавляем новую таску
      state = { ...state, [action.todoListID]: newArrayTasks }; // перезаписываем с учетом новой таски
      return state;
    }
    case REMOVE_TASK: {
      const todoList = state[action.todoListID]; //находим по ID нужный todoList
      const filteredTasks = todoList.filter((el) => el.id !== action.taskID); // фильтруем его
      // перезаписываем state отфильтрованными тасками
      state = { ...state, [action.todoListID]: filteredTasks };
      return state;
    }

    case CHANGE_TASK_STATUS: {
      // debugger;
      const todoList = state[action.todoListID]; //находим по ID нужный todoList
      const changedStatustask = todoList.map(
        (el) => (el.id === action.taskID ? { ...el, isDone: !el.isDone } : el) // перезаписываем с учетом нового статуса таски
      );
      state = { ...state, [action.todoListID]: changedStatustask };
      return state;
    }
    case CHANGE_TASK_TITLE: {
      const todoList = state[action.todoListID]; //находим по ID нужный todoList
      const taskAfterChanging = todoList.map((task) =>
        task.id === action.taskID
          ? { ...task, text: action.changedTaskName }
          : task
      ); //Ищем нужную таску и сразу же ее присваиваем
      state = { ...state, [action.todoListID]: taskAfterChanging };
      console.log(state);
      //   setTasks({ ...tasksObj }); // не мутируя исходник записываем
      return state;
    }

    default:
      return state;
  }
};
