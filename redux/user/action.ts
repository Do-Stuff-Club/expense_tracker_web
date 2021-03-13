import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserData } from '../../api/user/types';
import { RootState } from '../store';
import { UserActionTypes } from './types';

// FIXME change Promise<any> to more restricted type
export const loginAction = (
    data: UserData,
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: UserActionTypes.LOGIN,
        payload: {
            loggedIn: true,
            id: data.id,
            authHeaders: data.authHeaders,
        },
    });
};
