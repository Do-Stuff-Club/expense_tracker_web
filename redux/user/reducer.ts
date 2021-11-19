import { getUserId } from '../../services/auth.helper';
import { UserAction, UserActionTypes, UserState } from './types';

export const defaultUserState: UserState = {
    loggedIn: false,
    id: undefined,
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
        case UserActionTypes.LOGIN:
            return action.payload;
        default:
            return {
                ...state,
                id:
                    getUserId() !== undefined
                        ? parseInt(getUserId() as string)
                        : undefined,
            };
    }
}
