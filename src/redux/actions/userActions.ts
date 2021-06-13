import { UserActionReducerProps } from "../reducers/userReducer";
import UserTypes from "../types/UserTypes";

export const setUser = (userName: string): UserActionReducerProps => {
  return {
    type: UserTypes.SET_USER,
    payload: userName,
  };
};

