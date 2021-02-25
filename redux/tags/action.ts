import axios from 'axios';
import qs from 'qs';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { TagActionTypes, UpdateAllCategoriesAction } from './types';
import { AllCategoriesData, OneCategoryData } from '../../api/tag/types';

export const updateAllCategoriesAction = (
    data: AllCategoriesData,
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.UPDATE_ALL_CATEGORIES,
        payload: {
            categories: data.categories,
            authHeaders: data.authHeaders,
        },
    });
};

export const updateOneCategoryAction = (
    data: OneCategoryData,
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.UPDATE_ONE_CATEGORY,
        payload: {
            category: data.category,
            authHeaders: data.authHeaders,
        },
    });
};

export const createCategoryAction = (
    data: OneCategoryData,
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: TagActionTypes.CREATE_CATEGORY,
        payload: {
            category: data.category,
            authHeaders: data.authHeaders,
        },
    });
};
