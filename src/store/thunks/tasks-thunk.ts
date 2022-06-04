import { taskAPI } from "../../api/api";
import { setTasksAC } from "../actions";
import { AnyAction, Dispatch } from "redux";

export const getTasksThunkCreator = (todoListID: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    taskAPI.getTasks(todoListID).then((response) => {
      dispatch(setTasksAC(response.data.items, todoListID));
    });
  };
};
