import { Tag } from '../../redux/tags/types';

export type CreateTagParams = {
    name: string;
    parentId?: number;
};

export type UpdateTagParams = CreateTagParams & {
    id: number;
};

export type MoveTagParams = {
    id: number;
    name: string; //FIXME server crashes without name
    new_parent_id: number;
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
    tag: Tag;
};
