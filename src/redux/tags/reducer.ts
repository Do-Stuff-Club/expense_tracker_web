import {
    containsId,
    defaultTagState,
    removeTagInState,
    setTagInState,
} from './state';
import { TagState, TagAction, TagActionTypes, Tag } from './types';

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
        case TagActionTypes.GET_TAGS_INIT:
            return { ...defaultTagState, loading: true };
        case TagActionTypes.GET_TAGS_SUCCESS: {
            const rootIds = [...state.rootIds];

            const map = action.payload.tags.reduce((prev: Tag, curr: Tag) => ({
                ...prev,
                [curr.id]: curr,
            }));

            action.payload.tags.forEach((tag) => {
                if (tag.parentId === null && !rootIds.includes(tag.id)) {
                    rootIds.push(tag.id);
                }
                if (tag.parentId !== null && rootIds.includes(tag.id)) {
                    rootIds.splice(rootIds.indexOf(tag.id), 1);
                }
            });
            return {
                ...state,
                map,
                rootIds,
                loading: false,
            };
        }
        //TODO: add remaining reducers
        case TagActionTypes.GET_TAGS_FAIL:
            return { ...defaultTagState, loading: false };
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
