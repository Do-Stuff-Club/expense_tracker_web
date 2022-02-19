import { getUserId } from '../../services/auth.helper';
import { UserAction, UserActionTypes, UserState } from './types';

export const defaultUserState: UserState = {
    loading: false,
    loggedIn: false,
    user: { id: undefined },
};

/**
 * Redux reducer for user slice. Actions include:
 * - Login a user and track their authentication info
 *
 * @param {UserState} state - the current user state in the Redux store
 * @param {UserAction} action - the action object to execute
 * @returns {UserState} the new user state
 */
export default function user(
    state = defaultUserState,
    action: UserAction,
): UserState {
    switch (action.type) {
        case UserActionTypes.LOGIN_INIT:
            return { ...state, loading: true };
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case UserActionTypes.LOGIN_FAIL:
            return { ...state, loading: false };
        default:
            return {
                ...state,
                user: {
                    id:
                        getUserId() !== undefined
                            ? parseInt(getUserId() as string)
                            : undefined,
                },
            };
    }
}
