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
    console.log('In Tag Reducer!');
    console.log(action);
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
        case TagActionTypes.GET_TAGS_FAIL:
            return { ...defaultTagState, loading: false };

        case TagActionTypes.CREATE_TAG_INIT:
            return { ...state, loading: true };
        case TagActionTypes.CREATE_TAG_SUCCESS:
            if (!containsId(state, action.payload.tag.id))
                return {
                    ...setTagInState(state, action.payload.tag),
                    loading: false,
                };
            else return state;
        case TagActionTypes.CREATE_TAG_FAIL:
            return { ...state, loading: false };

        case TagActionTypes.UPDATE_TAG_INIT:
            return { ...state, loading: true };
        case TagActionTypes.UPDATE_TAG_SUCCESS:
            if (containsId(state, action.payload.tag.id))
                return {
                    ...setTagInState(state, action.payload.tag),
                    loading: false,
                };
            else return state;
        case TagActionTypes.UPDATE_TAG_FAIL:
            return { ...state, loading: false };

        case TagActionTypes.MOVE_TAG_INIT:
            return { ...state, loading: true };
        case TagActionTypes.MOVE_TAG_SUCCESS:
            if (containsId(state, action.payload.tag.id))
                return {
                    ...setTagInState(state, action.payload.tag),
                    loading: false,
                };
            else return state;
        case TagActionTypes.MOVE_TAG_FAIL:
            return { ...state, loading: true };

        //TODO: add remaining reducers
        case TagActionTypes.DELETE_TAG_INIT:
            return { ...state, loading: true };
        case TagActionTypes.DELETE_TAG_SUCCESS:
            return {
                ...removeTagInState(state, action.payload.tag),
                loading: false,
            };
        case TagActionTypes.DELETE_TAG_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}
