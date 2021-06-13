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
    console.log("Action", action.type, action.payload);
    console.log("Action", action);
  switch (action.type) {
    case UserTypes.SET_USER:
      return { ...state, name: action.payload };
    default:
      return { ...state };
  }
}
