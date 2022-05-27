import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: { "API-KEY": "196d543e-854d-4840-b68c-b0f81150459a" },
  withCredentials: true,
});

// ==== USERS ====

export const todoAPI = {
  getTodolists() {
    return instance.get<TodolistType>("/todo-lists");
  },

  createTodolist() {
    return instance.post<
      CommonResponseType<{
        item: TodolistType;
      }>
    >("/todo-lists", {
      title: "newToDo",
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`);
  },

  updateTodolistTitle(payload: updatePayloadType) {
    return instance.put<CommonResponseType>(
      `/todo-lists/${payload.todolistId}`,
      {
        title: payload.title,
      }
    );
  },
};

// ==== TYPES ====

type CommonResponseType<T = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: T;
};

type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type updatePayloadType = {
  todolistId: string;
  title: string;
};
