import UserTypes from "../types/UserTypes";

export type UserState = { name: string };
export type UserActionReducerProps = {
  type: UserTypes;
  payload: any;
};

export default function userReducer(
  state: UserState = { name: "" },
  action: UserActionReducerProps
) {
  switch (action.type) {
    case UserTypes.SET_USER:
      return { ...state, name: action.payload };
    default:
      return { ...state };
  }
}
