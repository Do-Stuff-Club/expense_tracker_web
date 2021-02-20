import { CreateTagParams } from "../../api/tag/types";
import { AuthHeaders } from "../user/types";

export interface Tag {
  name: string;
  id: number;
}

export interface Category {
  name: string;
  id: number;
  required: boolean;
  tags: ReadonlyArray<Tag>;
}

export interface TagState {
  categories: ReadonlyArray<Category>;
}

export enum TagActionTypes {
  UPDATE_ALL_CATEGORIES = "update_all_categories",
  UPDATE_ONE_CATEGORY = "update_one_category",
  CREATE_CATEGORY = "create_category",
}

export interface UpdateAllCategoriesAction {
  type: TagActionTypes.UPDATE_ALL_CATEGORIES;
  payload: {
    categories: ReadonlyArray<Category>;
    authHeaders: AuthHeaders;
  };
}

export interface UpdateOneCategoryAction {
  type: TagActionTypes.UPDATE_ONE_CATEGORY;
  payload: {
    category: Category;
    authHeaders: AuthHeaders;
  };
}

export interface CreateCategoryAction {
  type: TagActionTypes.CREATE_CATEGORY;
  payload: {
    category: Category;
    authHeaders: AuthHeaders;
  };
}

export type TagAction =
  | UpdateAllCategoriesAction
  | UpdateOneCategoryAction
  | CreateCategoryAction
