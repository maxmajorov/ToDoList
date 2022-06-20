import { RootStateType } from "../store";

export const selectAppInitialize = (state: RootStateType) =>
  state.app.isInitializeApp;
