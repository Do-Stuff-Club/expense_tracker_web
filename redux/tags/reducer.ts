import { RootState } from '../store';
import { defaultUserState } from '../user/reducer';
import { TagAction, TagActionTypes, TagState } from './types';

export const defaultTagState: TagState = {
    categories: [],
};

export default function tag(
    state = defaultTagState,
    action: TagAction,
): TagState {
    console.log('In Tag Reducer!');
    switch (action.type) {
        case TagActionTypes.UPDATE_ALL_CATEGORIES:
            return { categories: action.payload.categories };
        case TagActionTypes.UPDATE_ONE_CATEGORY:
            // Replace the edited category
            const newCategories = state.categories.map((category) => {
                if (category.id == action.payload.category.id)
                    return action.payload.category;
                else return category;
            });
            return { categories: newCategories };
        case TagActionTypes.CREATE_CATEGORY:
            return {
                categories: [...state.categories, action.payload.category],
            };
        default:
            return state;
    }
}
