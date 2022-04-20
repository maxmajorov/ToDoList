import React from "react";
import { useSelector } from "react-redux";
import { ToDoList } from "./ToDoList";
import { StoreContext } from "../../StoreContext";
import { RootState, store } from "../../store/redux-store";
import {
  FilterValuesType,
  addNewTodoListAC,
  changeFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "../../reducers/todoList-reducer";
import {
  addNewTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../actions/tasks-actions";

export const ToDoListContainer = () => {
  const todoListsState = useSelector((state: RootState) => state.todoList);

  return (
    <StoreContext.Consumer>
      {(state) => {
        // const todoListState = state.getState().todoList;

        // ====== FUNCTION FOR CHANGING TODOLIST ======

        const addNewTodoListCallback = (newItem: string) => {
          state.dispatch(addNewTodoListAC(newItem));
        };

        const removeTodoListCallback = (todoListID: string) => {
          state.dispatch(removeTodoListAC(todoListID));
        };

        const changeFilterCallback = (
          todoListID: string,
          filter: FilterValuesType
        ) => {
          state.dispatch(changeFilterAC(todoListID, filter));
        };

        const changeTodoListTitleCallback = (
          changedTitle: string,
          todoListID: string
        ) => {
          state.dispatch(changeTodoListTitleAC(changedTitle, todoListID));
        };

        // ====== FUNCTION FOR CHANGING TASKS_ITEM======

        const addTaskCallback = (newTaskName: string, todoListID: string) => {
          state.dispatch(addNewTaskAC(newTaskName, todoListID));
        };

        const removeTaskItemCallback = (taskID: string, todoListID: string) => {
          state.dispatch(removeTaskAC(taskID, todoListID));
        };

        const changeTaskStatusCallback = (
          taskID: string,
          isDone: boolean,
          todoListID: string
        ) => {
          state.dispatch(changeTaskStatusAC(taskID, isDone, todoListID));
        };

        const changeTextTaskCallback = (
          changedTaskName: string,
          todoListID: string,
          taskID: string
        ) => {
          state.dispatch(
            changeTaskTitleAC(changedTaskName, todoListID, taskID)
          );
        };

        const todoListAndTasksForRender = todoListsState.map((el) => {
          let todoListTasks = store.getState().task[el.id]; // присваиваем тот или туду лист в зависимости от id
          let filteredTasksForRender = todoListTasks;

          el.filter === "all"
            ? (filteredTasksForRender = todoListTasks)
            : el.filter === "completed"
            ? (filteredTasksForRender = todoListTasks.filter((el) => el.isDone))
            : (filteredTasksForRender = todoListTasks.filter(
                (el) => !el.isDone
              ));

          return (
            <ToDoList
              key={el.id}
              id={el.id}
              title={el.title}
              filter={el.filter}
              tasks={filteredTasksForRender}
              // ==== lists ====
              addNewTodoList={addNewTodoListCallback}
              removeTodoList={removeTodoListCallback}
              changeFilter={changeFilterCallback}
              changeTodoListTitle={changeTodoListTitleCallback}
              //==== tasks ====//
              addNewTask={addTaskCallback}
              removeTaskItem={removeTaskItemCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTextTask={changeTextTaskCallback}
            />
          );
        });
        return (
          <div className="todoList-items">{todoListAndTasksForRender}</div>
        );
      }}
    </StoreContext.Consumer>
  );
};

/* <StoreContext.Consumer>
  {(state) => {
    const postsState = state.getState().profileReduser;

    const addNewPostToStoreCallback = (newPost: string) => {
      state.dispatch(addPostActionCreator(newPost));
    };

    return (
      <Posts
        postsState={postsState}
        addNewPostToStore={addNewPostToStoreCallback}
      />
    );
  }}
</StoreContext.Consumer>; */

/* <div className="todoList-items">{todoListAndTasksForRender}</div>; */
