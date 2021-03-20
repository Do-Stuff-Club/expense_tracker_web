import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { ExpenseActionTypes } from "./types";
import { AllExpensesData, OneExpenseData } from "../../api/expense/types";

export const updateExpenseAction = (
    data: AllExpensesData
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    dispatch({
        type: ExpenseActionTypes.UPDATE_EXPENSE,
        payload: {
            expenses: data.expenses,
            authHeaders: data.authHeaders,
        },
    });
  };

export const createExpenseAction = (
    data: OneExpenseData
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    dispatch({
        type: ExpenseActionTypes.CREATE_EXPENSE,
        payload: {
            expense: data.expense,
            authHeaders: data.authHeaders,
        },
    });
};
