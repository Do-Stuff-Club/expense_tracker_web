// ===================================================================
//                             Imports
// ===================================================================
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { TagAction, TagActionTypes } from './types';
import { AllTagsData, OneTagData } from '../../api/tag/types';
import { getTagsCall } from '../../api/tag/call';

// ===================================================================
//                             Actions
// ===================================================================

//#region get all tags actions
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

export const createTagAction = (
    data: OneTagData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.CREATE_TAG,
        payload: {
            tag: data.tag,
        },
    });
};

export const updateTagAction = (
    data: OneTagData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.UPDATE_TAG,
        payload: {
            tag: data.tag,
        },
    });
};

export const deleteTagAction = (
    data: OneTagData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.DELETE_TAG,
        payload: {
            tag: data.tag,
        },
    });
};
