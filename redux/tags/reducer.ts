import { TagState, MapTagState } from './state';
import { TagAction, TagActionTypes } from './types';

export const defaultTagState: TagState = new MapTagState();

/**
 * Redux reducer for tag slice. Actions include:
 * - Updating all categories in the store
 * - Updating one category in the store
 * - Creating a new category in the store
 *
 * @param {TagState} state - the current tag state in the Redux store
 * @param {TagAction} action - the action object to execute
 * @returns {TagState} the new tag state
 */
export default function tag(
    state = defaultTagState,
    action: TagAction,
): TagState {
    switch (action.type) {
        case TagActionTypes.FETCH_TAGS:
            return state.fromTags(action.payload.tags);
        case TagActionTypes.CREATE_TAG:
            return state.addTag(action.payload.tag, state);
        case TagActionTypes.UPDATE_TAG:
            return state.updateTag(action.payload.tag, state);
        case TagActionTypes.DELETE_TAG:
            return state.deleteTag(action.payload.tag, state);
        default:
            return state;
    }
}
