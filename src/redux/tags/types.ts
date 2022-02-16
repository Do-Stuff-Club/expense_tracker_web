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
    loading: boolean;
    readonly map: Record<number, Tag>;
    readonly rootIds: ReadonlyArray<number>;
};

// ===================================================================
//                             Actions
// ===================================================================
export enum TagActionTypes {
    //#region Get all tags
    GET_TAGS_INIT = 'GET_TAGS_INIT',
    GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS',
    GET_TAGS_FAIL = 'GET_TAGS_FAIL',
    //#endregion

    //#region Create tag
    CREATE_TAG_INIT = 'CREATE_TAG_INIT',
    CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS',
    CREATE_TAG_FAIL = 'CREATE_TAG_FAIL',
    //#endregion

    //#region Update tag
    UPDATE_TAG_INIT = 'UPDATE_TAG_INIT',
    UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS',
    UPDATE_TAG_FAIL = 'UPDATE_TAG_FAIL',
    //#endregion

    //#region Delete tag
    DELETE_TAG_INIT = 'DELETE_TAG_INIT',
    DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS',
    DELETE_TAG_FAIL = 'DELETE_TAG_FAIL',
    //#endregion

    //#region Move tag
    MOVE_TAG_INIT = 'MOVE_TAG_INIT',
    MOVE_TAG_SUCCESS = 'MOVE_TAG_SUCCESS',
    MOVE_TAG_FAIL = 'MOVE_TAG_FAIL',
    //#endregion

    FETCH_TAGS = 'fetch_tags',
    CREATE_TAG = 'create_tag',
    UPDATE_TAG = 'update_tag',
    MOVE_TAG = 'move_tag',
    DELETE_TAG = 'delete_tag',
}

export type FetchTagsAction = {
    type:
        | TagActionTypes.GET_TAGS_INIT
        | TagActionTypes.GET_TAGS_SUCCESS
        | TagActionTypes.GET_TAGS_FAIL;
    payload: {
        tags: ReadonlyArray<Tag>;
    };
};

export type CreateTagAction = {
    type:
        | TagActionTypes.CREATE_TAG_INIT
        | TagActionTypes.CREATE_TAG_SUCCESS
        | TagActionTypes.CREATE_TAG_FAIL;
    payload: {
        tag: Tag;
    };
};

export type UpdateTagAction = {
    type:
        | TagActionTypes.UPDATE_TAG_INIT
        | TagActionTypes.UPDATE_TAG_SUCCESS
        | TagActionTypes.UPDATE_TAG_FAIL;
    payload: {
        tag: Tag;
    };
};

export type MoveTagAction = {
    type:
        | TagActionTypes.MOVE_TAG_INIT
        | TagActionTypes.MOVE_TAG_SUCCESS
        | TagActionTypes.MOVE_TAG_FAIL;
    payload: {
        tag: Tag;
    };
};

export type DeleteTagAction = {
    type:
        | TagActionTypes.DELETE_TAG_INIT
        | TagActionTypes.DELETE_TAG_SUCCESS
        | TagActionTypes.DELETE_TAG_FAIL;
    payload: {
        tag: Tag;
    };
};

export type TagAction =
    | FetchTagsAction
    | CreateTagAction
    | UpdateTagAction
    | MoveTagAction
    | DeleteTagAction;
