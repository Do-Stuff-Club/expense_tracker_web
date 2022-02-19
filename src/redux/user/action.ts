import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { loginCall, newUserCall } from '../../api/user/call';
import { LoginParams, NewUserParams } from '../../api/user/types';
import { storeUserId } from '../../services/auth.helper';
import { RootState } from '../store';
import { UserAction, UserActionTypes, UserInfo } from './types';

//#region login
/**
 * Action to login a user
 *
 * @param {LoginParams} data - User login credentials
 * @returns {void} - void promise
 */
export const loginAction = (
    data: LoginParams,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    let response = undefined;

    // init login action
    dispatch({ type: UserActionTypes.LOGIN_INIT });
    try {
        // API call to login
        response = await loginCall(data);

        // Store user ID
        storeUserId(response.id.toString());

        // dispatch success action
        dispatch(loginActionSuccess(response));
    } catch (error) {
        // dispatch fail action
        dispatch(loginActionFail());
    }
};

/**
 * Returns login success action
 *
 * @param {UserInfo} payload - Logged-in user's info
 * @returns {UserAction} - SUCCESS action
 */
const loginActionSuccess = (payload: UserInfo): UserAction => {
    return { type: UserActionTypes.LOGIN_SUCCESS, payload };
};

/**
 * Returns login fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const loginActionFail = (): Action<string> => {
    return { type: UserActionTypes.LOGIN_FAIL };
};
//#endregion

//#region sign up
/**
 * Action to sign up a user
 *
 * @param {NewUserParams} data - New user info
 * @returns {void} - void promise
 */
export const signUpAction = (
    data: NewUserParams,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    // init signUp action
    dispatch({ type: UserActionTypes.SIGNUP_INIT });
    try {
        // API call to signUp
        await newUserCall(data);

        // dispatch success action
        dispatch(signUpActionSuccess());
    } catch (error) {
        // dispatch fail action
        dispatch(signUpActionFail());
    }
};

/**
 * Returns sign up success action
 *
 * @returns {UserAction} - SUCCESS action
 */
const signUpActionSuccess = (): UserAction => {
    return { type: UserActionTypes.SIGNUP_SUCCESS };
};

/**
 * Returns sign up fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const signUpActionFail = (): Action<string> => {
    return { type: UserActionTypes.SIGNUP_FAIL };
};
//#endregion
