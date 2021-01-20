import { UserAction, UserActionTypes, UserState } from "./types";

export const defaultUserState: UserState = {
  loggedIn: false,
  id: -1,
  authHeaders: {
    client: "",
    "access-token": "",
    expiry: "",
    "token-type": "",
    uid: "",
  },
};

export default function user(
  state = defaultUserState,
  action: UserAction
): UserState {
  console.log("In User Reducer");
  switch (action.type) {
    case UserActionTypes.SIGN_UP:
      return action.payload;
    case UserActionTypes.LOGIN:
      return action.payload;
    default:
      console.log(action);
      return state;
  }
}
