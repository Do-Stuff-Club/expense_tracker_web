// ===================================================================
//                             Imports
// ===================================================================
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { TagAction, TagActionTypes } from './types';
import {
    AllTagsData,
    CreateTagParams,
    MoveTagParams,
    OneTagData,
    UpdateTagParams,
} from '../../api/tag/types';
import {
    createTagCall,
    deleteTagCall,
    getTagsCall,
    moveTagCall,
    updateTagCall,
} from '../../api/tag/call';

// ===================================================================
//                             Actions
// ===================================================================

//#region get all tags actions
/**
 * Action to get tag list
 *
 * @returns {Promise<AllTagsData | undefined>} - List of all tags
 */
export const getAllTagsAction = (): ThunkAction<
    Promise<AllTagsData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    let response = undefined;

    // dispatch init action
    dispatch({ type: TagActionTypes.GET_TAGS_INIT });

    try {
        // API call to get all tags
        response = await getTagsCall();

        // dispatch success action
        dispatch(getAllTagsActionSuccess(response));
    } catch (error) {
        // dispatch fail action
        dispatch(getAllTagsActionFail());
    }

    // return list of tags
    return response;
};

/**
 * Returns get all tags success action
 *
 * @param {AllTagsData} payload - List of all tags
 * @returns {TagAction} - SUCCESS action
 */
const getAllTagsActionSuccess = (payload: AllTagsData): TagAction => {
    return { type: TagActionTypes.GET_TAGS_SUCCESS, payload };
};

/**
 * Returns get all tags fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const getAllTagsActionFail = (): Action<string> => {
    return { type: TagActionTypes.GET_TAGS_FAIL };
};
//#endregion

//#region Create New Tag action
export const createNewTagAction = (
    data: CreateTagParams,
): ThunkAction<
    Promise<OneTagData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    // init create tag
    dispatch({ type: TagActionTypes.CREATE_TAG_INIT });
    let response = undefined;
    try {
        // API call to create new tag
        response = await createTagCall(data);
        // dispatch success action
        dispatch(createNewTagActionSuccess(response));
    } catch (error) {
        // handle the failure
        dispatch(createNewTagActionFail());
    }

    // return the tag object
    return response;
};

/**
 * Returns create new tag fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const createNewTagActionFail = (): Action<string> => {
    return { type: TagActionTypes.CREATE_TAG_FAIL };
};

/**
 * Returns create new tag success action
 *
 * @param {OneTagData} payload - action payload
 * @returns {TagAction} - SUCCESS action
 */
const createNewTagActionSuccess = (payload: OneTagData): TagAction => {
    return { type: TagActionTypes.CREATE_TAG_SUCCESS, payload };
};
//#endregion

//#region Update tag action
export const updateTagAction = (
    data: UpdateTagParams,
): ThunkAction<
    Promise<OneTagData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    // init update tag
    dispatch({ type: TagActionTypes.UPDATE_TAG_INIT });

    let response = undefined;
    try {
        // API call to update tag
        response = await updateTagCall(data);
        // dispatch success action
        dispatch(updateTagActionSuccess(response));
    } catch (error) {
        // handle the failure
        dispatch(updateTagActionFail());
    }

    // return the tag object
    return response;
};

/**
 * Returns update tag fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const updateTagActionFail = (): Action<string> => {
    return { type: TagActionTypes.UPDATE_TAG_FAIL };
};

/**
 * Returns update tag success action
 *
 * @param {OneTagData} payload - action payload
 * @returns {TagAction} - SUCCESS action
 */
const updateTagActionSuccess = (payload: OneTagData): TagAction => {
    return { type: TagActionTypes.UPDATE_TAG_SUCCESS, payload };
};
//#endregion

//#region delete tag action
export const deleteTagAction = (
    tagId: number,
): ThunkAction<
    Promise<OneTagData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    // init update tag
    dispatch({ type: TagActionTypes.DELETE_TAG_INIT });

    let response = undefined;
    try {
        // API call to delete tag
        response = await deleteTagCall({ id: tagId });
        // dispatch success action
        dispatch(deleteTagActionSuccess(response));
    } catch (error) {
        // handle the failure
        dispatch(deleteTagActionFail());
    }

    // return the tag object
    return response;
};

/**
 * Returns delete tag fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const deleteTagActionFail = (): Action<string> => {
    return { type: TagActionTypes.DELETE_TAG_FAIL };
};

/**
 * Returns delete tag success action
 *
 * @param {OneTagData} payload - action payload
 * @returns {TagAction} - SUCCESS action
 */
const deleteTagActionSuccess = (payload: OneTagData): TagAction => {
    return { type: TagActionTypes.DELETE_TAG_SUCCESS, payload };
};
//#endregion

//#region Move tag action
export const moveTagAction = (
    data: MoveTagParams,
): ThunkAction<
    Promise<OneTagData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    // init move tag
    dispatch({ type: TagActionTypes.MOVE_TAG_INIT });

    let response = undefined;
    try {
        // API call to move tag
        response = await moveTagCall(data);
        // dispatch success action
        dispatch(moveTagActionSuccess(response));
    } catch (error) {
        // handle the failure
        dispatch(moveTagActionFail());
    }

    // return the tag object
    return response;
};

/**
 * Returns move tag fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const moveTagActionFail = (): Action<string> => {
    return { type: TagActionTypes.MOVE_TAG_FAIL };
};

/**
 * Returns move tag success action
 *
 * @param {OneTagData} payload - action payload
 * @returns {TagAction} - SUCCESS action
 */
const moveTagActionSuccess = (payload: OneTagData): TagAction => {
    return { type: TagActionTypes.MOVE_TAG_SUCCESS, payload };
};
//#endregion
