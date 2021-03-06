import axios, { AxiosResponse } from "axios";
import { RequestStatusType } from "../store/reducers/app-reducer";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: { "API-KEY": "196d543e-854d-4840-b68c-b0f81150459a" },
  withCredentials: true,
});

// ==== AUTHORIZATION ====

export const authAPI = {
  authMe() {
    return instance.get<ResponseType<AuthMeType>>("auth/me");
  },

  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: string }>>
    >("auth/login", data);
  },

  logout() {
    return instance.delete<LoguotResponseType>("auth/login");
  },
};

// ==== TODO ====

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>
    >("todo-lists", { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${id}`,
      { title }
    );
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};

// ==== TYPES ====

export type AuthMeType = {
  userId: number;
  email: string;
  login: string;
};

export type LoginResponseType = {
  resultCode: number;
  messages: string;
  data: {
    userId: number;
  };
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};

export type LoguotResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
  entityTaskStatus: RequestStatusType;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
