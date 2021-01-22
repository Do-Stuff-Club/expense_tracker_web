import { RootState } from "../store";
import { defaultUserState } from "../user/reducer";
import { TagAction, TagActionTypes, TagState } from "./types";

export const defaultTagState: TagState = {
  categories: [],
};

export default function tag(
  state = defaultTagState,
  action: TagAction
): TagState {
  switch (action.type) {
    case TagActionTypes.FETCH:
      return action.payload.tags;
    case TagActionTypes.EDIT_CATEGORY:
      const newCategories =state.categories.map((category) => {
        if (category.id == action.payload.category.id)

      })
 
      return {categories: newCategories    }
    case TagActionTypes.DELETE_CATEGORY:
      return action.payload.tags;
    default:
      return state;
  }
}
