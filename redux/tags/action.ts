// ===================================================================
//                             Imports
// ===================================================================
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { TagActionTypes } from './types';
import { AllTagsData, OneTagData } from '../../api/tag/types';

// ===================================================================
//                             Actions
// ===================================================================
export const fetchTagsAction = (
    data: AllTagsData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.FETCH_TAGS,
        payload: {
            tags: data.tags,
            authHeaders: data.authHeaders,
        },
    });
}

export const createTagAction = (
    data: OneTagData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.CREATE_TAG,
        payload: {
            tag: data.tag,
            authHeaders: data.authHeaders,
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
            authHeaders: data.authHeaders,
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
            authHeaders: data.authHeaders,
        },
    });
};
