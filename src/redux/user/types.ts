export interface UserInfo {
    id: number | undefined;
}

export interface UserState {
    loading: boolean;
    loggedIn: boolean;
    user: UserInfo;
}

export enum UserActionTypes {
    //#region Login
    LOGIN_INIT = 'LOGIN_INIT',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    //#endregion

    //#region Login
    SIGNUP_INIT = 'SIGNUP_INIT',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_FAIL = 'SIGNUP_FAIL',
    //#endregion
}

export interface UserLoginAction {
    type:
        | UserActionTypes.LOGIN_INIT
        | UserActionTypes.LOGIN_SUCCESS
        | UserActionTypes.LOGIN_FAIL;
    payload: UserInfo;
}

export interface UserSignUpAction {
    type:
        | UserActionTypes.SIGNUP_INIT
        | UserActionTypes.SIGNUP_SUCCESS
        | UserActionTypes.SIGNUP_FAIL;
}

export type UserAction = UserLoginAction | UserSignUpAction;
