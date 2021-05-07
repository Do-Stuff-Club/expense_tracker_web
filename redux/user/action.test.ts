import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { UserData } from '../../api/user/types';
import { RootState } from '../store';
import { defaultTagState } from '../tags/reducer';
import { loginAction } from './action';
import { defaultUserState } from './reducer';
import { UserActionTypes } from './types';

// https://stackoverflow.com/questions/52648553/typescript-unit-tests-correct-typing-for-dispatching-a-thunk-with-store-dispat
type DispatchExtensions = ThunkDispatch<RootState, void, AnyAction>;
const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExtensions>(
    middlewares,
);

describe('loginAction', () => {
    it('creates a single LOGIN action when it resolves', () => {
        const testInput: UserData = {
            id: 42,
            authHeaders: {
                'access-token': '-MW9nVhXviMt83nlYQU9yw',
                'token-type': 'Bearer',
                client: 'VZ6QbHPUroBvLnVcKQGYkw',
                expiry: '1618718924',
                uid: 'test@test.org',
            },
        };
        const expectedActions = [
            {
                type: UserActionTypes.LOGIN,
                payload: {
                    loggedIn: true,
                    id: testInput.id,
                    authHeaders: testInput.authHeaders,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
        });
        store.dispatch(loginAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
