// ===================================================================
//                             Imports
// ===================================================================
import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AllTagsData, OneTagData } from '../../api/tag/types';
import { defaultExpenseState } from '../expenses/reducer';
import { RootState } from '../store';
import { defaultTagState } from '../tags/state';
import { defaultUserState } from '../user/reducer';
import {
    createTagAction,
    deleteTagAction,
    fetchTagsAction,
    updateTagAction,
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
describe('fetchTagsAction()', () => {
    it('creates a single FETCH_TAGS action when it resolves', () => {
        const testInput: AllTagsData = {
            tags: [],
        };
        const expectedActions = [
            {
                type: TagActionTypes.FETCH_TAGS,
                payload: {
                    tags: testInput.tags,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
            expense: defaultExpenseState,
        });
        return store.dispatch(fetchTagsAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('createTagAction()', () => {
    it('creates a single CREATE_TAG action when it resolves', () => {
        const testInput: OneTagData = {
            tag: {
                name: 'test tag',
                id: 42,
                childIds: [],
            },
        };
        const expectedActions = [
            {
                type: TagActionTypes.CREATE_TAG,
                payload: {
                    tag: testInput.tag,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
            expense: defaultExpenseState,
        });
        return store.dispatch(createTagAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('updateTagAction()', () => {
    it('creates a single UPDATE_TAG action when it resolves', () => {
        const testInput: OneTagData = {
            tag: {
                name: 'test tag',
                id: 42,
                childIds: [],
            },
        };
        const expectedActions = [
            {
                type: TagActionTypes.UPDATE_TAG,
                payload: {
                    tag: testInput.tag,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
            expense: defaultExpenseState,
        });
        return store.dispatch(updateTagAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('deleteTagAction()', () => {
    it('creates a single DELETE_TAG action when it resolves', () => {
        const testInput: OneTagData = {
            tag: {
                name: 'test tag',
                id: 42,
                childIds: [],
            },
        };
        const expectedActions = [
            {
                type: TagActionTypes.DELETE_TAG,
                payload: {
                    tag: testInput.tag,
                },
            },
        ];

        const store = mockStore({
            user: defaultUserState,
            tag: defaultTagState,
            expense: defaultExpenseState,
        });
        return store.dispatch(deleteTagAction(testInput)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
