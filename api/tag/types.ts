import { Tag } from '../../redux/tags/types';
import { AuthHeaders } from '../../redux/user/types';

export type GetTagParams = {
    headers: AuthHeaders;
};

export type CreateTagParams = {
    name: string;
    parent_id?: number;
    headers: AuthHeaders;
};

export type UpdateTagParams = CreateTagParams & {
    id: number;
};

export interface DeleteTagParams {
    id: number;
    headers: AuthHeaders;
}

export type TagResponse = {
    id: number;
    name: string;
    parent_id?: number;
    created_at: string;
    updated_at: string;
};

export type AllTagsData = {
    authHeaders: AuthHeaders;
    tags: ReadonlyArray<Tag>;
};

export type OneTagData = {
    authHeaders: AuthHeaders;
    tag: Tag;
};
