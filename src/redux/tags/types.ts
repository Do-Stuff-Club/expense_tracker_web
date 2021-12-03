// ===================================================================
//                              State
// ===================================================================
export type Tag = {
    readonly name: string;
    readonly id: number;
    readonly parentId?: number;
    readonly childIds: ReadonlyArray<number>;
};

export type TagState = {
    readonly map: Record<number, Tag>;
    readonly rootIds: ReadonlyArray<number>;
};

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
    };
};

export type CreateTagAction = {
    type: TagActionTypes.CREATE_TAG;
    payload: {
        tag: Tag;
    };
};

export type UpdateTagAction = {
    type: TagActionTypes.UPDATE_TAG;
    payload: {
        tag: Tag;
    };
};

export type DeleteTagAction = {
    type: TagActionTypes.DELETE_TAG;
    payload: {
        tag: Tag;
    };
};

export type TagAction =
    | FetchTagsAction
    | CreateTagAction
    | UpdateTagAction
    | DeleteTagAction;
