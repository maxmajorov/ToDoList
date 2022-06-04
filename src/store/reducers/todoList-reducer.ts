import { v1 } from "uuid";
import {
  ActionsType,
  ADD_NEW_TODOLIST,
  CHANGE_FILTER,
  CHANGE_TITLE,
  REMOVE_TODOLIST,
  SET_TODOLISTS,
} from "../actions/todo-actions";

export type FilterValuesType = "all" | "active" | "completed";

type TodosType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
  filter: FilterValuesType;
};

export type initialStateType = {
  todos: Array<TodosType>;
};

const initialState = {
  todos: [],
};

export const todoListReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case SET_TODOLISTS: {
      return {
        ...state,
        todos: action.todoLists.map((tl) => ({ ...tl, filter: "all" })),
      };
    }

    // case ADD_NEW_TODOLIST:
    //   const newTodoList: TodosFromServerType = {
    //     id: action.newTodoListID,
    //     title: action.newItem,
    //     filter: "all",
    //   }; // Создаем новый todolist
    //   state = [...state, newTodoList];
    //   return state;

    // case REMOVE_TODOLIST: {
    //   const withoutRemoveTodo = state.filter(
    //     (el) => el.id !== action.todoListID
    //   ); //фильтруем листы по ID
    //   state = [...withoutRemoveTodo];
    //   return state;
    // }
    // case CHANGE_FILTER: {
    //   return state.map((list) =>
    //     list.id === action.todoListID
    //       ? { ...list, filter: action.filter }
    //       : list
    //   );
    // }

    // case CHANGE_TITLE: {
    //   return state.map((list) =>
    //     list.id === action.todoListID
    //       ? { ...list, title: action.changedTitle }
    //       : list
    //   );
    // }

    default: {
      return state;
    }
  }
};
