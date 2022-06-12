import {
  ActionsType,
  APP_SET_ERROR,
  APP_SET_STATUS,
} from "../actions/app-actions";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case APP_SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case APP_SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

// ==== TYPES ====
