import { v1 } from "uuid";
import { store } from "./redux-store";
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

// ===== ACTIONS =====
const ADD_NEW_TASK = "ADD-NEW-TASK";
const REMOVE_TASK = "REMOVE-TASK";
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS";
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";

type ActionsType =
  | AddNewTaskACType
  | ChangeTaskStatusACType
  | RemoveTaskACType
  | ChangeTaskTitleACType;

type AddNewTaskACType = {
  type: typeof ADD_NEW_TASK;
  newItem: string;
  todoListID: string;
};

type ChangeTaskStatusACType = {
  type: typeof CHANGE_TASK_STATUS;
  isDone: boolean;
  todoListID: string;
  taskID: string;
};

type RemoveTaskACType = {
  type: typeof REMOVE_TASK;
  taskID: string;
  todoListID: string;
};

type ChangeTaskTitleACType = {
  type: typeof CHANGE_TASK_TITLE;
  taskID: string;
  newItem: string;
  todoListID: string;
};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case ADD_NEW_TASK: {
      debugger;
      const todoList = state[action.todoListID]; //находим по ID нужный todoList
      const addnewTask = { id: v1(), text: action.newItem, isDone: false }; //создаем новую таску
      const newArrayTasks = [addnewTask, ...todoList]; // добавляем новую таску
      // state[action.todoListID] = newArrayTasks; // перезаписываем с учетом новой таски
      state = { ...state, [action.todoListID]: newArrayTasks };
      // setTasks({ ...tasksObj }); // не мутируя исходник записываем

      console.log(state);
      return state;
    }
    default:
      return state;
  }
};

// const [tasksObj, setTasks] = useState<TaskStateType>({
//   [todoListID_1]: [
//     { id: v1(), text: "HTML", isDone: true },
//     { id: v1(), text: "CSS", isDone: true },
//     { id: v1(), text: "React", isDone: false },
//     { id: v1(), text: "TypeScript", isDone: false },
//   ],
//   [todoListID_2]: [
//     { id: v1(), text: "Milk", isDone: true },
//     { id: v1(), text: "Bread", isDone: true },
//     { id: v1(), text: "Salt", isDone: false },
//   ],
// });

// const removeTaskItem = (taskID: string, todoListID: string) => {
//   const task = tasksObj[todoListID]; //находим по ID нужный todoList
//   const filteredTasks = task.filter((el) => el.id !== taskID); // фильтруем его
//   tasksObj[todoListID] = filteredTasks; // перезаписываем его отфильтрованными тасками
//   setTasks({ ...tasksObj }); // не мутируя исходник записываем
// };

// const addTask = (newTask: string, todoListID: string) => {
//   const task = tasksObj[todoListID]; //находим по ID нужный todoList
//   const addnewTask = { id: v1(), text: newTask, isDone: false }; //создаем новую таску
//   const newArrayTasks = [addnewTask, ...task]; // добавляем новую таску
//   tasksObj[todoListID] = newArrayTasks; // перезаписываем с учетом новой таски
//   setTasks({ ...tasksObj }); // не мутируя исходник записываем
// };

// const changeTaskStatus = (
//   taskID: string,
//   isDone: boolean,
//   todoListID: string
// ) => {
//   const task = tasksObj[todoListID]; //находим по ID нужный todoList
//   tasksObj[todoListID] = task.map(
//     (el) => (el.id === taskID ? { ...el, isDone: !el.isDone } : el) // перезаписываем с учетом нового статуса таски
//   );

//   setTasks({ ...tasksObj }); // не мутируя исходник записываем
// };

// const onChangeTextTaskCallback = (
//   changedTask: string,
//   todoListID: string,
//   taskID: string
// ) => {
//   const listByTodoListID = tasksObj[todoListID]; //находим по ID нужный todoList
//   const newTaskAfterChangingByTaskID = listByTodoListID.map((task) =>
//     task.id === taskID ? (task.text = changedTask) : task
//   ); //Ищем нужную таску и сразу же ее присваиваем
//   console.log(newTaskAfterChangingByTaskID);
//   setTasks({ ...tasksObj }); // не мутируя исходник записываем
// };

export const addNewTaskAC = (
  newTaskName: string,
  todoListID: string
): AddNewTaskACType => ({
  type: ADD_NEW_TASK,
  newItem: newTaskName,
  todoListID: todoListID,
});

export const changeTaskStatusAC = (
  todoListID: string,
  taskID: string,
  isDone: boolean
): ChangeTaskStatusACType => ({
  type: CHANGE_TASK_STATUS,
  taskID: taskID,
  todoListID: todoListID,
  isDone: isDone,
});

export const removeTaskAC = (
  taskID: string,
  todoListID: string
): RemoveTaskACType => ({
  type: REMOVE_TASK,
  taskID: taskID,
  todoListID: todoListID,
});

export const changeTaskTitleAC = (
  changedTaskName: string,
  todoListID: string,
  taskID: string
): ChangeTaskTitleACType => ({
  type: CHANGE_TASK_TITLE,
  newItem: changedTaskName,
  todoListID: todoListID,
  taskID: taskID,
});
