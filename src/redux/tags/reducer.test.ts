// ===================================================================
//                             Imports
// ===================================================================
import tag from './reducer';
import { defaultTagState } from './state';
import { TagAction, TagActionTypes, TagState } from './types';
// ===================================================================
//                           Test Setup
// ===================================================================
const testState: TagState = defaultTagState;

// ===================================================================
//                              Tests
// ===================================================================
describe('tag reducer', () => {
    it('should initialize all tags on FETCH_TAGS action', () => {
        const testAction: TagAction = {
            type: TagActionTypes.FETCH_TAGS,
            payload: {
                tags: [
                    {
                        name: 'New Category 0',
                        id: 42,
                        childIds: [],
                    },
                    {
                        name: 'New Category 1',
                        id: 256,
                        childIds: [],
                    },
                ],
            },
        };

        const expectedState: TagState = {
            map: {
                '42': {
                    name: 'New Category 0',
                    id: 42,
                    childIds: [],
                },
                '256': {
                    name: 'New Category 1',
                    id: 256,
                    childIds: [],
                },
            },
            rootIds: [42, 256],
        };

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should add new tag on CREATE_TAG action', () => {
        const testAction: TagAction = {
            type: TagActionTypes.CREATE_TAG,
            payload: {
                tag: {
                    name: 'New Name',
                    id: 2,
                    childIds: [],
                },
            },
        };

        const expectedState: TagState = {
            map: {
                '2': {
                    name: 'New Name',
                    id: 2,
                    childIds: [],
                },
            },
            rootIds: [2],
        };

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should have an updated tag on UPDATE_TAG action with valid ID', () => {
        const testState = {
            map: {
                '42': {
                    id: 42,
                    name: 'Boring name',
                    childIds: [],
                },
            },
            rootIds: [42],
        };

        const testAction: TagAction = {
            type: TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'Cool Name!',
                    id: 42,
                    parentId: 9001,
                    childIds: [],
                },
            },
        };

        const expectedState: TagState = {
            map: {
                '42': {
                    name: 'Cool Name!',
                    id: 42,
                    parentId: 9001,
                    childIds: [],
                },
            },
            rootIds: [],
        };

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should return an unchanged state on UPDATE_TAG action with a non-existent ID', () => {
        const testAction: TagAction = {
            type: TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'New Name',
                    id: 42, // Doesn't exist in testState
                    parentId: 9001,
                    childIds: [],
                },
            },
        };

        const expectedState: TagState = testState;

        expect(tag(testState, testAction)).toEqual(expectedState);
    });

    it('should remove a tag on DELETE_TAG action with valid ID', () => {
        const testState = {
            map: {
                '42': {
                    id: 42,
                    name: 'Delete me',
                    childIds: [],
                },
            },
            rootIds: [42],
        };

        const testAction: TagAction = {
            type: TagActionTypes.DELETE_TAG,
            payload: {
                tag: {
                    id: 42,
                    name: 'Delete me',
                    childIds: [],
                },
            },
        };
        expect(tag(testState, testAction)).toEqual(defaultTagState);
    });

    it('should return an unchanged state on an unknown action', () => {
        const initalState: TagState = defaultTagState;

        const testAction: TagAction = {
            type: 'unknown' as TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'bad',
                    id: 42,
                    childIds: [],
                },
            },
        };

        expect(tag(initalState, testAction)).toEqual(initalState);
    });

    it('should default to using the defaultTagState if no input state is provided', () => {
        const testAction: TagAction = {
            type: 'unknown' as TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'bad',
                    id: 42,
                    childIds: [],
                },
            },
        };

        expect(tag(undefined, testAction)).toEqual(defaultTagState);
    });
});
