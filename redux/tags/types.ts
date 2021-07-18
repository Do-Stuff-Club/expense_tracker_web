// ===================================================================
//                             Imports
// ===================================================================
import { AuthHeaders } from '../user/types';
import { Tag } from './state';

// ===================================================================
//                             Actions
// ===================================================================
export enum TagActionTypes {
    FETCH_TAGS = 'fetch_tags',
    CREATE_TAG = 'create_tag',
    UPDATE_TAG = 'update_tag',
    DELETE_TAG = 'delete_tag',
}

export type FetchTagsAction = {
    type: TagActionTypes.FETCH_TAGS;
    payload: {
        tags: ReadonlyArray<Tag>;
        authHeaders: AuthHeaders;
    };
};

export type CreateTagAction = {
    type: TagActionTypes.CREATE_TAG;
    payload: {
        newTag: Tag;
        authHeaders: AuthHeaders;
    };
};

export type UpdateTagAction = {
    type: TagActionTypes.UPDATE_TAG;
    payload: {
        tag: Tag;
        authHeaders: AuthHeaders;
    };
};

export type DeleteTagAction = {
    type: TagActionTypes.DELETE_TAG;
    payload: {
        tag: Tag;
        authHeaders: AuthHeaders;
    };
};

export type TagAction =
    | FetchTagsAction
    | CreateTagAction
    | UpdateTagAction
    | DeleteTagAction;
