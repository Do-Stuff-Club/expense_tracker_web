// ===================================================================
//                             Imports
// ===================================================================
import user, { defaultUserState } from './reducer';
import { UserAction, UserActionTypes, UserState } from './types';

// ===================================================================
//                              Tests
// ===================================================================
describe('user reducer', () => {
    it('should update the state on LOGIN action', () => {
        const initalState: UserState = defaultUserState;

        const testAction: UserAction = {
            type: UserActionTypes.LOGIN,
            payload: {
                loggedIn: true,
                id: 42,
            },
        };

        const expectedState: UserState = testAction.payload;

        expect(user(initalState, testAction)).toEqual(expectedState);
    });

    it('should return the initial state on an unknown action', () => {
        const initalState: UserState = defaultUserState;

        const testAction: UserAction = {
            type: 'unknown' as UserActionTypes,
            payload: {
                loggedIn: true,
                id: 42,
            },
        };

        const expectedState: UserState = initalState;

        expect(user(initalState, testAction)).toEqual(expectedState);
    });

    it('should default to using the defaultUserState if no state is provided', () => {
        const testAction: UserAction = {
            type: 'unknown' as UserActionTypes,
            payload: {
                loggedIn: true,
                id: undefined,
            },
        };

        expect(user(undefined, testAction)).toEqual(defaultUserState);
    });
});
