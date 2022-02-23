// ===================================================================
//                             Imports
// ===================================================================
import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { UserData } from '../../api/user/types';
import { defaultExpenseState } from '../expenses/reducer';
import { RootState } from '../store';
import { defaultTagState } from '../tags/state';
import { loginAction } from './action';
import { defaultUserState } from './reducer';
import { UserActionTypes } from './types';

// ===================================================================
//                           Test Setup
// ===================================================================
// https://stackoverflow.com/questions/52648553/typescript-unit-tests-correct-typing-for-dispatching-a-thunk-with-store-dispat
type DispatchExtensions = ThunkDispatch<RootState, void, AnyAction>;
const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExtensions>(
    middlewares,
);

// ===================================================================
//                              Tests
// ===================================================================
describe('loginAction', () => {
    it('creates a single LOGIN action when it resolves', () => {
        const testInput: UserData = {
            id: 42,
        };
        const expectedActions = [
            {
                type: UserActionTypes.LOGIN,
                payload: {
                    loggedIn: true,
                    id: testInput.id,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
            expense: defaultExpenseState,
        });
        return store.dispatch(loginAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
