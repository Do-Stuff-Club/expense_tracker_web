// ===================================================================
//                             Imports
// ===================================================================
import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AllCategoriesData, OneCategoryData } from '../../api/tag/types';
import { RootState } from '../store';
import { defaultTagState } from '../tags/reducer';
import { defaultUserState } from '../user/reducer';
import {
    updateAllCategoriesAction,
    updateOneCategoryAction,
    createCategoryAction,
} from './action';
import { TagActionTypes } from './types';

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
describe('updateAllCategoriesAction()', () => {
    it('creates a single UPDATE_ALL_CATEGORIES action when it resolves', () => {
        const testInput: AllCategoriesData = {
            categories: [],
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
                type: TagActionTypes.UPDATE_ALL_CATEGORIES,
                payload: {
                    categories: testInput.categories,
                    authHeaders: testInput.authHeaders,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
        });
        return store.dispatch(updateAllCategoriesAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('updateOneCategoryAction()', () => {
    it('creates a single UPDATE_ONE_CATEGORY action when it resolves', () => {
        const testInput: OneCategoryData = {
            category: {
                name: 'test category',
                id: 42,
                required: false,
                tags: [],
            },
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
                type: TagActionTypes.UPDATE_ONE_CATEGORY,
                payload: {
                    category: testInput.category,
                    authHeaders: testInput.authHeaders,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
        });
        return store.dispatch(updateOneCategoryAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('createOneCategoryAction()', () => {
    it('creates a single CREATE_CATEGORY action when it resolves', () => {
        const testInput: OneCategoryData = {
            category: {
                name: 'test category',
                id: 42,
                required: false,
                tags: [],
            },
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
                type: TagActionTypes.CREATE_CATEGORY,
                payload: {
                    category: testInput.category,
                    authHeaders: testInput.authHeaders,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
        });
        return store.dispatch(createCategoryAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
