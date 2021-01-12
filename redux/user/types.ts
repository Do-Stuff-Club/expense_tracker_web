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
    authHeaders: AuthHeaders
}

export enum UserActionTypes {
    SIGN_UP = "sign_up",
    LOGIN = "login"
}

export interface UserLoginAction {
    type: UserActionTypes
    payload: UserState
}

export type UserAction = UserLoginAction