import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { appReducer, tasksReducer, todolistsReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// ======Создаем Store======

const rootReducers = combineReducers({
  todoList: todolistsReducer,
  task: tasksReducer,
  app: appReducer,
});

type RootReducersType = typeof rootReducers;

export const store: Store<RootStateType> = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export type RootStateType = ReturnType<RootReducersType>;

// export const useAppDispatch = () => useDispatch<RootStateType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

//@ts-ignore
window.store = store;
