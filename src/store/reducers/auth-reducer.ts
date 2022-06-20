import { LOGOUT } from "./../actions/auth-actions";
import { ActionsType, AUTH_ME, LOGIN } from "../actions/auth-actions";

// export type InitialStateType = {
//   isAuth: boolean;
// };

const initialState = {
  isAuth: false,
};

type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case AUTH_ME: {
      return {
        ...state,
        isAuth: !state.isAuth,
      };
    }

    case LOGIN: {
      return {
        ...state,
        isAuth: !state.isAuth,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        isAuth: !state.isAuth,
      };
    }

    default:
      return state;
  }
};

// ==== TYPES ====
