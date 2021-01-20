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
  FETCH = "fetch",
  CREATE_TAG = "create_tag",
  RENAME_TAG = "rename_tag",
  DELETE_TAG = "delete_tag",
  CREATE_CATEGORY = "create_category",
  DELETE_CATEGORY = "delete_category",
}

export interface TagFetchAction {
  type: TagActionTypes;
  payload: {
    tags: TagState;
    authHeaders: AuthHeaders;
  };
}

export interface TagCreateCategoryAction {
  type: TagActionTypes;
  payload: {
    name: string;
    tags: TagState;
    authHeaders: AuthHeaders;
  };
}

export type TagAction = TagFetchAction | TagCreateCategoryAction;
