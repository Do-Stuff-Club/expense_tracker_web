import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserData } from '../../api/user/types';
import { storeUserId } from '../../services/auth.helper';
import { RootState } from '../store';
import { UserActionTypes } from './types';

export const loginAction = (
    data: UserData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    storeUserId(data.id.toString());
    dispatch({
        type: UserActionTypes.LOGIN,
        payload: {
            loggedIn: true,
            id: data.id,
        },
    });
};
