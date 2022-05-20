import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { TasksType } from "./tasks-reducer";
import { todoListID_1, todoListID_2 } from "./todoList-reducer";

type TaskStateType = {
  [key: string]: Array<TasksType>;
};

const initialState: TaskStateType = {
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

type AddTaskType = {
  newItem: string;
  todoListID: string;
  type: "ADD-NEW-TASK";
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addnewTask: (state, action: PayloadAction<AddTaskType>) => {
      if (action.type === ADD_NEW_TASK) {
        const todoList = state[action.payload.todoListID]; //находим по ID нужный todoList
        const addnewTask = {
          id: v1(),
          text: action.payload.newItem,
          isDone: false,
        }; //создаем новую таску
        const newArrayTasks = [addnewTask, ...todoList]; // добавляем новую таску
        // state[action.todoListID] = newArrayTasks; // перезаписываем с учетом новой таски
        state = { ...state, [action.payload.todoListID]: newArrayTasks };
        // setTasks({ ...tasksObj }); // не мутируя исходник записываем

        console.log(state);
        return state;
      } else return console.log("Wrong type");
    },
    // removeTaskItem: (state, action: RemoveTaskACType) => {},
    // changeTaskStatus: (state, action: ChangeTaskStatusACType) => {},
    // changeTodoListTitle: (state, action: ChangeTaskTitleACType) => {},
  },
});

// Action creators are generated for each case reducer function
// export const {
//   addnewTask,
//   // removeTaskAC,
//   // changeTaskStatusAC,
//   // changeTaskTitleAC,
// } = taskSlice.actions;

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
  // payload: {
  newItem: string;
  todoListID: string;
  type: typeof ADD_NEW_TASK;
  // };
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

export const addNewTaskAC = (
  newTaskName: string,
  todoListID: string
): AddNewTaskACType => ({
  type: ADD_NEW_TASK,
  newItem: newTaskName,
  todoListID: todoListID,
});

// export const changeTaskStatusAC = (
//   todoListID: string,
//   taskID: string,
//   isDone: boolean
// ): ChangeTaskStatusACType => ({
//   type: CHANGE_TASK_STATUS,
//   taskID: taskID,
//   todoListID: todoListID,
//   isDone: isDone,
// });

// export const removeTaskAC = (
//   taskID: string,
//   todoListID: string
// ): RemoveTaskACType => ({
//   type: REMOVE_TASK,
//   taskID: taskID,
//   todoListID: todoListID,
// });

// export const changeTaskTitleAC = (
//   changedTaskName: string,
//   todoListID: string,
//   taskID: string
// ): ChangeTaskTitleACType => ({
//   type: CHANGE_TASK_TITLE,
//   newItem: changedTaskName,
//   todoListID: todoListID,
//   taskID: taskID,
// });

// export default taskSlice.reducer;
