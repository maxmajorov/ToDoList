import { v1 } from "uuid";

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

// ===== ACTIONS =====
const ADD_NEW_TODOLIST = "ADD-NEW-TODOLIST";
const CHANGE_FILTER = "CHANGE-FILTER";
const REMOVE_TODOLIST = "REMOVE-TODOLIST";
const CHANGE_TITLE = "CHANGE_TITLE";

type ActionsType =
  | AddNewTodoListACType
  | ChangeFilterACType
  | RemoveTodoListACType
  | ChangeTodoListTitleACType;

type AddNewTodoListACType = {
  type: typeof ADD_NEW_TODOLIST;
  newItem: string;
};

type ChangeFilterACType = {
  type: typeof CHANGE_FILTER;
  filter: FilterValuesType;
  todoListID: string;
};

type RemoveTodoListACType = {
  type: typeof REMOVE_TODOLIST;
  todoListID: string;
};

type ChangeTodoListTitleACType = {
  type: typeof CHANGE_TITLE;
  newItem: string;
  todoListID: string;
};

export const todoListReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case ADD_NEW_TODOLIST:
      const todoListID = v1();
      const newTodoList: TodoListType = {
        // Создаем новый todolist
        id: todoListID,
        title: action.newItem,
        filter: "all",
      };
      state = [...state, newTodoList]; //Не мутируя исходник добавляем новый
      return state;

    case REMOVE_TODOLIST:
    case CHANGE_FILTER:
    case CHANGE_TITLE:
    default: {
      return state;
    }
  }
};

// const changeFilter = (filter: FilterValuesType, todoListID: string) => {
//   let todoList = todoLists.find((el) => el.id === todoListID);

//   if (todoList) {
//     todoList.filter = filter;
//     setTodoLists([...todoLists]);
//   }
// };

// const addNewToDoList = (newTodosName: string) => {
//   const todoListID = v1();
//   const newTodoList: TodoListType = {
//     // Создаем новый todolist
//     id: todoListID,
//     title: newTodosName,
//     filter: "all",
//   };
//   setTodoLists([...todoLists, newTodoList]); //Не мутируя исходник добавляем новый
//   setTasks({
//     ...tasksObj,
//     [todoListID]: [],
//   }); //Также не мутируя исходник тасок добавляем новый список тасок который изначально пустой
// };

// const removeTodoList = (todoListID: string) => {
//   const withoutRemoveTodo = todoLists.filter((el) => el.id !== todoListID); //фильтруем листы по ID
//   setTodoLists(withoutRemoveTodo); //устанавливаем с учетом отвильтрованных листов
//   delete tasksObj[todoListID]; //также удаляем задачи для этого листа
//   setTasks({ ...tasksObj }); // также установливаем таски заново с учетом удаленных
// };

// const onChangeTodosTitleCallback = (
//   changedTitle: string,
//   todoListID: string
// ) => {
//   const todoListForChanging = todoLists.map((todoList) =>
//     todoList.id === todoListID ? (todoList.title = changedTitle) : todoList
//   );
//   console.log("changed title", todoListForChanging);
//   setTodoLists([...todoLists]);
// };

export const addNewTodoListAC = (
  newTodoListName: string
): AddNewTodoListACType => ({
  type: ADD_NEW_TODOLIST,
  newItem: newTodoListName,
});

export const changeFilterAC = (
  todoListID: string,
  filter: FilterValuesType
): ChangeFilterACType => ({
  type: CHANGE_FILTER,
  todoListID: todoListID,
  filter: filter,
});

export const removeTodoListAC = (todoListID: string): RemoveTodoListACType => ({
  type: REMOVE_TODOLIST,
  todoListID: todoListID,
});

export const changeTodoListTitleAC = (
  changedTitle: string,
  todoListID: string
): ChangeTodoListTitleACType => ({
  type: CHANGE_TITLE,
  newItem: changedTitle,
  todoListID: todoListID,
});
