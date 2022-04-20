import { v1 } from "uuid";
import {
  ActionsType,
  ADD_NEW_TODOLIST,
  CHANGE_FILTER,
  CHANGE_TITLE,
  REMOVE_TODOLIST,
} from "../actions/todo-actions";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export let todoListID_1 = v1();
export let todoListID_2 = v1();

const initialState: Array<TodoListType> = [
  { id: todoListID_1, title: "What to learn", filter: "all" },
  { id: todoListID_2, title: "What to buy", filter: "all" },
];

export const todoListReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case ADD_NEW_TODOLIST:
      // const newTodoListID = v1();
      const newTodoList: TodoListType = {
        id: action.newTodoListID,
        title: action.newItem,
        filter: "all",
      }; // Создаем новый todolist
      state = [...state, newTodoList];
      return state;

    case REMOVE_TODOLIST: {
      const withoutRemoveTodo = state.filter(
        (el) => el.id !== action.todoListID
      ); //фильтруем листы по ID
      state = [...withoutRemoveTodo];
      return state;
    }
    case CHANGE_FILTER: {
      // const todoList: Array<TodoListType> = state.map((el) =>
      //   el.id === action.todoListID ? { ...el, filter: action.filter } : el
      // );

      return state.map((list) =>
        list.id === action.todoListID
          ? { ...list, filter: action.filter }
          : list
      );
    }

    case CHANGE_TITLE: {
      // const todoListForChanging = state.map((list) =>
      //   list.id === action.todoListID
      //     ? { ...list, title: action.changedTitle }
      //     : list
      // );

      return state.map((list) =>
        list.id === action.todoListID
          ? { ...list, title: action.changedTitle }
          : list
      );
    }
    default: {
      return state;
    }
  }
};
