import {
    containsId,
    defaultTagState,
    removeTagInState,
    setTagInState,
} from './state';
import { TagState, TagAction, TagActionTypes } from './types';

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
            return action.payload.tags.reduce(setTagInState, defaultTagState);
        case TagActionTypes.CREATE_TAG:
            if (!containsId(state, action.payload.tag.id))
                return setTagInState(state, action.payload.tag);
            else return state;
        case TagActionTypes.UPDATE_TAG:
            if (containsId(state, action.payload.tag.id))
                return setTagInState(state, action.payload.tag);
            else return state;
        case TagActionTypes.DELETE_TAG:
            return removeTagInState(state, action.payload.tag);
        default:
            return state;
    }
}
