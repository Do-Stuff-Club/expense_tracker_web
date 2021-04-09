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

export interface CategoryResponse {
    id: number;
    name: string;
    required: boolean;
    created_at: string;
    updated_at: string;
    user_id: number;
    tags: Array<TagResponse>;
}

export interface TagResponse {
    id: number;
    name: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}

export interface AllCategoriesData {
    authHeaders: AuthHeaders;
    categories: ReadonlyArray<Category>;
}

export interface OneCategoryData {
    authHeaders: AuthHeaders;
    category: Category;
}
