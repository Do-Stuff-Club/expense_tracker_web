export interface UserState {
    loggedIn: boolean;
    id: number | undefined;
}

export enum UserActionTypes {
    LOGIN = 'login',
}

export interface UserLoginAction {
    type: UserActionTypes.LOGIN;
    payload: UserState;
}

export type UserAction = UserLoginAction;
