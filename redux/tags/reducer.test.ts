// ===================================================================
//                             Imports
// ===================================================================
import tag, { defaultTagState } from './reducer';
import { TagAction, TagActionTypes, TagState } from './types';
// ===================================================================
//                           Test Setup
// ===================================================================
const testState: TagState = {
    categories: [
        {
            name: 'test category 0',
            id: 0,
            required: false,
            tags: [],
        },
        {
            name: 'test category 1',
            id: 1,
            required: true,
            tags: [],
        },
        {
            name: 'test category 2',
            id: 2,
            required: false,
            tags: [],
        },
    ],
};

// ===================================================================
//                              Tests
// ===================================================================
describe('tag reducer', () => {
    it('should replace all categories on UPDATE_ONE_CATEGORY action', () => {
        const testAction: TagAction = {
            type: TagActionTypes.UPDATE_ALL_CATEGORIES,
            payload: {
                categories: [
                    {
                        name: 'New Category 0',
                        id: 42,
                        required: true,
                        tags: [],
                    },
                    {
                        name: 'New Category 1',
                        id: 256,
                        required: true,
                        tags: [],
                    },
                ],
                authHeaders: {
                    'access-token': '-MW9nVhXviMt83nlYQU9yw',
                    'token-type': 'Bearer',
                    client: 'VZ6QbHPUroBvLnVcKQGYkw',
                    expiry: '1618718924',
                    uid: 'test@test.org',
                },
            },
        };

        const expectedState: TagState = {
            categories: [
                {
                    name: 'New Category 0',
                    id: 42,
                    required: true,
                    tags: [],
                },
                {
                    name: 'New Category 1',
                    id: 256,
                    required: true,
                    tags: [],
                },
            ],
        };

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should update an existing category on UPDATE_ONE_CATEGORY action', () => {
        const testAction: TagAction = {
            type: TagActionTypes.UPDATE_ONE_CATEGORY,
            payload: {
                category: {
                    name: 'New Name',
                    id: 2,
                    required: true,
                    tags: [],
                },
                authHeaders: {
                    'access-token': '-MW9nVhXviMt83nlYQU9yw',
                    'token-type': 'Bearer',
                    client: 'VZ6QbHPUroBvLnVcKQGYkw',
                    expiry: '1618718924',
                    uid: 'test@test.org',
                },
            },
        };

        const expectedState: TagState = {
            categories: [
                {
                    name: 'test category 0',
                    id: 0,
                    required: false,
                    tags: [],
                },
                {
                    name: 'test category 1',
                    id: 1,
                    required: true,
                    tags: [],
                },
                {
                    name: 'New Name',
                    id: 2,
                    required: true,
                    tags: [],
                },
            ],
        };

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should return an unchanged state on UPDATE_ONE_CATEGORY action with a non-existent ID', () => {
        const testAction: TagAction = {
            type: TagActionTypes.UPDATE_ONE_CATEGORY,
            payload: {
                category: {
                    name: 'New Name',
                    id: 42, // Doesn't exist in testState
                    required: true,
                    tags: [],
                },
                authHeaders: {
                    'access-token': '-MW9nVhXviMt83nlYQU9yw',
                    'token-type': 'Bearer',
                    client: 'VZ6QbHPUroBvLnVcKQGYkw',
                    expiry: '1618718924',
                    uid: 'test@test.org',
                },
            },
        };

        const expectedState: TagState = testState;

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should append a category on CREATE_CATEGORY action', () => {
        const testAction: TagAction = {
            type: TagActionTypes.CREATE_CATEGORY,
            payload: {
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
            },
        };

        const expectedState: TagState = {
            categories: [
                {
                    name: 'test category 0',
                    id: 0,
                    required: false,
                    tags: [],
                },
                {
                    name: 'test category 1',
                    id: 1,
                    required: true,
                    tags: [],
                },
                {
                    name: 'test category 2',
                    id: 2,
                    required: false,
                    tags: [],
                },
                {
                    name: 'test category',
                    id: 42,
                    required: false,
                    tags: [],
                },
            ],
        };

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should return an unchanged state on an unknown action', () => {
        const initalState: TagState = defaultTagState;

        const testAction: TagAction = {
            type: 'unknown' as TagActionTypes.UPDATE_ONE_CATEGORY,
            payload: {
                category: {
                    name: 'bad',
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
            },
        };

        const expectedState: TagState = initalState;

        expect(tag(initalState, testAction)).toEqual(expectedState);
    });

    it('should default to using the defaultTagState if no input state is provided', () => {
        const testAction: TagAction = {
            type: 'unknown' as TagActionTypes.UPDATE_ONE_CATEGORY,
            payload: {
                category: {
                    name: 'bad',
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
            },
        };

        expect(tag(undefined, testAction)).toEqual(defaultTagState);
    });
});
