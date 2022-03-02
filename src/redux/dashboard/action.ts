// ===================================================================
//                             Imports
// ===================================================================
import { Dispatch } from 'react';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { queryExpensesCall } from '../../api/expense/call';
import { AllExpensesData, QueryExpenseParams } from '../../api/expense/types';
import { RootState } from '../store';
import { DashboardAction, DashboardActionTypes } from './types';

// ===================================================================
//                             Actions
// ===================================================================
//#region query expenses actions
/**
 * Action to query expenses by date and tags
 *
 * @returns {Promise<Expense[] | undefined>} - List of expenses
 */
export const queryExpensesAction = (
    data: QueryExpenseParams,
): ThunkAction<
    Promise<AllExpensesData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch<DashboardAction>) => {
    let response = undefined;

    // dispatch init action
    dispatch({ type: DashboardActionTypes.QUERY_EXPENSES_INIT });

    try {
        // API call to get all tags
        response = await queryExpensesCall(data);

        // dispatch success action
        dispatch(queryExpensesActionSuccess(response));
    } catch (error) {
        // dispatch fail action
        dispatch(queryExpensesActionFail());
    }

    // return list of tags
    return response;
};

/**
 * Returns query expneses success action
 *
 * @param {AllTagsData} payload - List of all tags
 * @returns {TagAction} - SUCCESS action
 */
const queryExpensesActionSuccess = (
    payload: AllExpensesData,
): DashboardAction => {
    return { type: DashboardActionTypes.QUERY_EXPENSES_SUCCESS, payload };
};

/**
 * Returns query expenses fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const queryExpensesActionFail = (): DashboardAction => {
    return { type: DashboardActionTypes.QUERY_EXPENSES_FAIL };
};
//#endregion
