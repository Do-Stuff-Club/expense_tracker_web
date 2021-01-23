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
  console.log("In Tag Reducer!");
  switch (action.type) {
    case TagActionTypes.FETCH:
      return action.payload.tags;
    case TagActionTypes.EDIT_CATEGORY:
      // Replace the edited category
      const newCategories = state.categories.map((category) => {
        if (category.id == action.payload.category.id)
          return action.payload.category;
        else return category;
      });
      return { categories: newCategories };
    default:
      return state;
  }
}
