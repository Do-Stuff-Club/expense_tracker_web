import { Tag } from '../../redux/tags/types';
import { AuthHeaders } from '../../redux/user/types';

export type GetTagParams = {
    headers: AuthHeaders;
};

export type CreateTagParams = {
    name: string;
    parent_id?: number;
};

export type UpdateTagParams = CreateTagParams & {
    id: number;
};

export interface DeleteTagParams {
    id: number;
}

export type TagResponse = {
    id: number;
    name: string;
    parent_id?: number;
    created_at: string;
    updated_at: string;
    children_ids: ReadonlyArray<number>;
};

export type AllTagsData = {
    tags: ReadonlyArray<Tag>;
};

export type OneTagData = {
    authHeaders: AuthHeaders;
    tag: Tag;
};
