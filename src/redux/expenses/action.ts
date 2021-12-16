import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { ExpenseAction, ExpenseActionTypes } from './types';
import {
    AllExpensesData,
    CreateExpenseParams,
    OneExpenseData,
} from '../../api/expense/types';

import { createExpenseCall } from '../../api/expense/call';

//#region Create New expense
/**
 * Action to create new expense
 *
 * @param {CreateExpenseParams} data - New expense
 * @returns {Promise<OneExpenseData | undefined>} - newly created expense
 */
export const createNewExpenseAction = (
    data: CreateExpenseParams,
): ThunkAction<
    Promise<OneExpenseData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    // this action can be used to start the spinners and other UI related things before the actual data arrives
    dispatch({ type: ExpenseActionTypes.CREATE_EXPENSE_INIT });
    let response = undefined;
    try {
        // API call to create new expense
        response = await createExpenseCall(data);
        // dispatch success action
        dispatch(createNewExpenseActionSuccess(response));
    } catch (error) {
        // handle the failure
        dispatch(createNewExpenseActionFail());
    }

    // return the expense object
    return response;
};
/**
 * Return create new expense fail action
 *
 * @returns {Action<string>} Fail action
 */
const createNewExpenseActionFail = (): Action<string> => {
    return { type: ExpenseActionTypes.CREATE_EXPENSE_FAIL };
};

/**
 * Return create new expense success action
 *
 * @param {OneExpenseData} payload - action payload
 * @returns {ExpenseAction} returns expense action
 */
const createNewExpenseActionSuccess = (
    payload: OneExpenseData,
): ExpenseAction => {
    return { type: ExpenseActionTypes.CREATE_EXPENSE_SUCCESS, payload };
};
//#endregion
//#region Update expense

//#endregion

export const updateAllExpensesAction = (
    data: AllExpensesData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: ExpenseActionTypes.UPDATE_ALL_EXPENSES,
        payload: {
            expenses: data.expenses,
        },
    });
};

export const updateOneExpenseAction = (
    data: OneExpenseData,
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch({
        type: ExpenseActionTypes.UPDATE_ONE_EXPENSE,
        payload: {
            expense: data.expense,
        },
    });
};
