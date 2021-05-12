import { TagAction, TagActionTypes, TagState } from './types';

export const defaultTagState: TagState = {
    categories: [],
};

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
        case TagActionTypes.UPDATE_ALL_CATEGORIES:
            return { categories: action.payload.categories };
        case TagActionTypes.UPDATE_ONE_CATEGORY:
            // Replace the edited category
            return {
                categories: state.categories.map((category) => {
                    if (category.id == action.payload.category.id)
                        return action.payload.category;
                    else return category;
                }),
            };
        case TagActionTypes.CREATE_CATEGORY:
            return {
                categories: [...state.categories, action.payload.category],
            };
        default:
            return state;
    }
}
