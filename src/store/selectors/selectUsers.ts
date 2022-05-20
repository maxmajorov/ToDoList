import { RootStoreType } from "./../index";
import { UserType } from "../../types/UserType";

export const selectUsers = (state: RootStoreType): UserType[] =>
  state.usersData.users;
