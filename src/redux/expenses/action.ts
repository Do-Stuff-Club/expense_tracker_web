import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { ExpenseAction, ExpenseActionTypes } from './types';
import {
    AllExpensesData,
    CreateExpenseParams,
    OneExpenseData,
    UpdateExpenseParams,
} from '../../api/expense/types';

import {
    createExpenseCall,
    deleteExpenseCall,
    getExpensesCall,
    updateExpenseCall,
} from '../../api/expense/call';

//#region get all expenses
/**
 * Action to return all expenses of the given user
 *
 * @param {number} userId - Current user id
 * @returns {Promise<AllExpensesData | undefined>} - User's all expenses
 */
export const getExpensesAction = (
    userId: number | undefined,
): ThunkAction<
    Promise<AllExpensesData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    let response = undefined;

    // init get all expenses action
    dispatch({ type: ExpenseActionTypes.GET_EXPENSES_INIT });
    try {
        // API call to get user's all expenses
        response = await getExpensesCall(userId);

        // dispatch success action
        dispatch(getExpensesActionSuccess(response));
    } catch (error) {
        // dispatch fail action
        dispatch(getExpensesActionFail());
    }

    // return list of expenses
    return response;
};

/**
 * Returns get expenses success action
 *
 * @param {AllExpensesData} payload - All expenses
 * @returns {ExpenseAction} - SUCCESS action
 */
const getExpensesActionSuccess = (payload: AllExpensesData): ExpenseAction => {
    return { type: ExpenseActionTypes.GET_EXPENSES_SUCCESS, payload };
};

/**
 * Returns get expenses fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const getExpensesActionFail = (): Action<string> => {
    return { type: ExpenseActionTypes.GET_EXPENSES_FAIL };
};
//#endregion

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
/**
 * Action to update existing expense
 *
 * @param {UpdateExpenseParams} data - Updated expense
 * @returns {Promise<OneExpenseData | undefined>} - Updated expense
 */
export const updateExpenseAction = (
    data: UpdateExpenseParams,
): ThunkAction<
    Promise<OneExpenseData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    let response = undefined;
    // init update action
    dispatch({ type: ExpenseActionTypes.UPDATE_EXPENSE_INIT });

    try {
        // API call to update the expense
        response = await updateExpenseCall(data);
        // dispatch success action
        dispatch(updateExpenseActionSuccess(response));
    } catch (error) {
        // dispatch fail action
        dispatch(updateExpenseActionFail());
    }

    // return the updated expense
    return response;
};

/**
 * Returns update expense success action
 *
 * @param {OneExpenseData} payload - Updated expense
 * @returns {ExpenseAction} - SUCCESS action
 */
const updateExpenseActionSuccess = (payload: OneExpenseData): ExpenseAction => {
    return {
        type: ExpenseActionTypes.UPDATE_EXPENSE_SUCCESS,
        payload,
    };
};

/**
 * Returns update expense fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const updateExpenseActionFail = (): Action<string> => {
    return {
        type: ExpenseActionTypes.UPDATE_EXPENSE_FAIL,
    };
};
//#endregion

//#region delete expense actions
/**
 * Action to delete single expense
 *
 * @param {number} expenseId - Id of the expense to be removed
 * @returns {Promise<AllExpensesData | undefined>} - List of remaining expenses
 */
export const deleteExpenseAction = (
    expenseId: number,
): ThunkAction<
    Promise<AllExpensesData | undefined>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch) => {
    let response = undefined;

    dispatch({ type: ExpenseActionTypes.DELETE_EXPENSE_INIT });
    try {
        response = await deleteExpenseCall({ id: expenseId });

        dispatch(deleteExpenseActionSuccess(response));
    } catch (error) {
        dispatch(deleteExpenseActionFail());
    }

    return response;
};

/**
 * Returns delete expense success action
 *
 * @param {AllExpensesData} payload - All expenses
 * @returns {ExpenseAction} - SUCCESS action
 */
const deleteExpenseActionSuccess = (
    payload: AllExpensesData,
): ExpenseAction => {
    return {
        type: ExpenseActionTypes.DELETE_EXPENSE_SUCCESS,
        payload,
    };
};

/**
 * Return delete expense fail action
 *
 * @returns {Action<string>} - FAIL action
 */
const deleteExpenseActionFail = (): Action<string> => {
    return { type: ExpenseActionTypes.DELETE_EXPENSE_FAIL };
};

//#endregion
