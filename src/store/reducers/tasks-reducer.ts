import { SET_TODOLISTS } from "./../actions/todo-actions";
import { v1 } from "uuid";
import { TasksType } from "../../api/api";
import {
  ActionsType,
  ADD_NEW_TASK,
  ADD_EMPTY_ARRAY_TASK,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_TITLE,
  REMOVE_TASK,
  SET_TASKS,
} from "../actions/tasks-actions";

export type TaskStateType = {
  [key: string]: Array<TasksType>;
};

let initialState: TaskStateType = {};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case SET_TODOLISTS: {
      const stateCopy = { ...state };
      action.todoLists.forEach((tl) => (stateCopy[tl.id] = []));
      return stateCopy;
    }

    case SET_TASKS: {
      const stateCopy = { ...state };
      stateCopy[action.todoListID] = action.tasks;
      return stateCopy;
    }
    // case ADD_NEW_TASK: {
    //   const todoList = state[action.todoListID]; //находим по ID нужный todoList
    //   const addnewTask = { id: v1(), text: action.newItem, isDone: false }; //создаем новую таску
    //   const newArrayTasks = [addnewTask, ...todoList]; // добавляем новую таску
    //   return { ...state, [action.todoListID]: newArrayTasks }; // перезаписываем с учетом новой таски
    // }
    // case ADD_EMPTY_ARRAY_TASK: {
    //   return { ...state, [action.newTodoListID]: [] };
    // }
    // case REMOVE_TASK: {
    //   const todoList = state[action.todoListID]; //находим по ID нужный todoList
    //   const filteredTasks = todoList.filter((el) => el.id !== action.taskID); // фильтруем его
    //   // перезаписываем state отфильтрованными тасками
    //   return { ...state, [action.todoListID]: filteredTasks };
    // }

    // case CHANGE_TASK_STATUS: {
    //   const todoList = state[action.todoListID]; //находим по ID нужный todoList
    //   const changedStatustask = todoList.map(
    //     (el) => (el.id === action.taskID ? { ...el, isDone: !el.isDone } : el) // перезаписываем с учетом нового статуса таски
    //   );
    //   state = { ...state, [action.todoListID]: changedStatustask };
    //   return state;
    // }
    // case CHANGE_TASK_TITLE: {
    //   const todoList = state[action.todoListID]; //находим по ID нужный todoList
    //   const taskAfterChanging = todoList.map((task) =>
    //     task.id === action.taskID
    //       ? { ...task, text: action.changedTaskName }
    //       : task
    //   ); //Ищем нужную таску и сразу же ее присваиваем
    //   state = { ...state, [action.todoListID]: taskAfterChanging };
    //   return state;
    // }

    default:
      return state;
  }
};
