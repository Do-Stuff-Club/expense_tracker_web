import { Category, Tag } from '../../redux/tags/types';
import { AuthHeaders } from '../../redux/user/types';

export interface GetTagParams {
    user_id: number;
    headers: AuthHeaders;
}

export interface CreateCategoryParams {
    name: string;
    required: boolean;
    tags: ReadonlyArray<string>;
    headers: AuthHeaders;
}

export interface DeleteCategoryParams {
    id: number;
    headers: AuthHeaders;
}

export interface UpdateCategoryParams {
    category: Category;
    headers: AuthHeaders;
}

export interface CreateTagParams {
    name: string;
    category: Category;
    headers: AuthHeaders;
}

export interface DeleteTagParams {
    id: number;
    category: Category;
    headers: AuthHeaders;
}

export interface UpdateTagParams {
    tag: Tag;
    category: Category;
    headers: AuthHeaders;
}

export interface AllCategoriesData {
    authHeaders: AuthHeaders;
    categories: ReadonlyArray<Category>;
}

export interface OneCategoryData {
    authHeaders: AuthHeaders;
    category: Category;
}
