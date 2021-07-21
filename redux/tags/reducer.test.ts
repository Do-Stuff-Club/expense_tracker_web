// ===================================================================
//                             Imports
// ===================================================================
import tag, { defaultTagState } from './reducer';
import { Tag, TagState } from './state';
import { TagAction, TagActionTypes } from './types';
import isEqual from 'lodash/isEqual';
// ===================================================================
//                           Test Setup
// ===================================================================
const testState: TagState = defaultTagState;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveTags(expectedTags: ReadonlyArray<Tag>): R;
        }
    }
}

/**
 * Helper function that checks that all tags in an array are in the state
 *
 * @param {TagState} received - The received test state
 * @param {ReadonlyArray<Tag>} expectedTags - The tags to check for in the test state
 * @returns {jest.CustomMatcherResult} - Matcher result for Jest
 */
function toHaveTags(
    received: TagState,
    expectedTags: ReadonlyArray<Tag>,
): jest.CustomMatcherResult {
    let mismatchedInReceieved: ReadonlyArray<[Tag, Tag]> = [];
    let missingInReceived: ReadonlyArray<Tag> = [];
    expectedTags.forEach((tag) => {
        const tagOrUndefined = received.getTagById(tag.id, received);
        if (tagOrUndefined == undefined)
            missingInReceived = [...missingInReceived, tag];
        else {
            if (!isEqual(tag, tagOrUndefined)) {
                mismatchedInReceieved = [
                    ...mismatchedInReceieved,
                    [tag, tagOrUndefined],
                ];
            }
        }
    });

    if (mismatchedInReceieved.length == 0 && missingInReceived.length == 0) {
        return {
            pass: true,
            message: () =>
                `expected state to not contain all of ${JSON.stringify(
                    expectedTags,
                )}`,
        };
    } else {
        return {
            pass: false,
            message: () =>
                `state was missing ${JSON.stringify(
                    missingInReceived,
                )}, and had mismatched values for ${JSON.stringify(
                    mismatchedInReceieved,
                )}`,
        };
    }
}
expect.extend({ toHaveTags });

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
                    },
                    {
                        name: 'New Category 1',
                        id: 256,
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

        const expectedTags: ReadonlyArray<Tag> = [
            {
                name: 'New Category 0',
                id: 42,
            },
            {
                name: 'New Category 1',
                id: 256,
            },
        ];

        expect(tag(testState, testAction)).toHaveTags(expectedTags);
    });

    it('should add new tag on CREATE_TAG action', () => {
        const testAction: TagAction = {
            type: TagActionTypes.CREATE_TAG,
            payload: {
                tag: {
                    name: 'New Name',
                    id: 2,
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

        const expectedTags: ReadonlyArray<Tag> = [
            {
                name: 'New Name',
                id: 2,
            },
        ];

        expect(tag(testState, testAction)).toHaveTags(expectedTags);
    });

    it('should have an updated tag on UPDATE_TAG action with valid ID', () => {
        const testTag = {
            id: 42,
            name: 'Boring name',
        };
        const updateTestState = testState.addTag(testTag, testState);

        const testAction: TagAction = {
            type: TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'Cool Name!',
                    id: 42,
                    parentId: 9001,
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

        const expectedTags: ReadonlyArray<Tag> = [
            {
                id: 42,
                name: 'Cool Name!',
                parentId: 9001,
            },
        ];

        expect(tag(updateTestState, testAction)).toHaveTags(expectedTags);
    });

    it('should return an unchanged state on UPDATE_TAG action with a non-existent ID', () => {
        const testAction: TagAction = {
            type: TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'New Name',
                    id: 42, // Doesn't exist in testState
                    parentId: 9001,
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

    it('should remove a tag on DELETE_TAG action with valid ID', () => {
        const testTag = {
            id: 42,
            name: 'Delete me!',
        };
        const deleteTestState = testState.addTag(testTag, testState);
        const testAction: TagAction = {
            type: TagActionTypes.DELETE_TAG,
            payload: {
                tag: testTag,
                authHeaders: {
                    'access-token': '-MW9nVhXviMt83nlYQU9yw',
                    'token-type': 'Bearer',
                    client: 'VZ6QbHPUroBvLnVcKQGYkw',
                    expiry: '1618718924',
                    uid: 'test@test.org',
                },
            },
        };
        expect(tag(deleteTestState, testAction)).toEqual(defaultTagState);
    });

    it('should return an unchanged state on an unknown action', () => {
        const initalState: TagState = defaultTagState;

        const testAction: TagAction = {
            type: 'unknown' as TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'bad',
                    id: 42,
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

        expect(tag(initalState, testAction)).toEqual(initalState);
    });

    it('should default to using the defaultTagState if no input state is provided', () => {
        const testAction: TagAction = {
            type: 'unknown' as TagActionTypes.UPDATE_TAG,
            payload: {
                tag: {
                    name: 'bad',
                    id: 42,
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
