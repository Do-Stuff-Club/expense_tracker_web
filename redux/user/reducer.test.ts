import user, { defaultUserState } from './reducer';
import { UserAction, UserActionTypes, UserState } from './types';

describe('user reducer', () => {
    it('should update the state on LOGIN action', () => {
        const initalState: UserState = defaultUserState;

        const testAction: UserAction = {
            type: UserActionTypes.LOGIN,
            payload: {
                loggedIn: true,
                id: 42,
                authHeaders: {
                    'access-token': '-MW9nVhXviMt83nlYQU9yw',
                    'token-type': 'Bearer',
                    client: 'VZ6QbHPUroBvLnVcKQGYkw',
                    expiry: '1618718924',
                    uid: 'test@test.org',
                },
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
                authHeaders: {
                    'access-token': '-MW9nVhXviMt83nlYQU9yw',
                    'token-type': 'Bearer',
                    client: 'VZ6QbHPUroBvLnVcKQGYkw',
                    expiry: '1618718924',
                    uid: 'test@test.org',
                },
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
                id: 42,
                authHeaders: {
                    'access-token': '-MW9nVhXviMt83nlYQU9yw',
                    'token-type': 'Bearer',
                    client: 'VZ6QbHPUroBvLnVcKQGYkw',
                    expiry: '1618718924',
                    uid: 'test@test.org',
                },
            },
        };

        expect(user(undefined, testAction)).toEqual(defaultUserState);
    });
});
