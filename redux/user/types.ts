export interface AuthHeaders {
  client: string;
  expiry: string;
  uid: string;
  "access-token": string;
  "token-type": string;
}

export interface UserState {
  loggedIn: boolean;
  id: number;
  authHeaders: AuthHeaders;
}

export enum UserActionTypes {
  LOGIN = "login",
}

export interface UserLoginAction {
  type: UserActionTypes.LOGIN;
  payload: UserState;
}

export type UserAction = UserLoginAction;
