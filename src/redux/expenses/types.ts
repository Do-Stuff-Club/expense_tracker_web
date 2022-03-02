import { Tag } from '../tags/types';

export interface Expense {
    name: string;
    id: number;
    cost: number;
    date: string;
    link: string;
    tags: ReadonlyArray<Tag>;
}

export interface ExpenseState {
    expenses: ReadonlyArray<Expense>;
    loading: boolean;
}

export enum ExpenseActionTypes {
    //#endregion get all expenses
    GET_EXPENSES_INIT = 'GET_EXPENSES_INIT',
    GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS',
    GET_EXPENSES_FAIL = 'GET_EXPENSES_FAIL',
    //#endregion

    //#region create expense
    CREATE_EXPENSE_INIT = 'CREATE_EXPENSE_INIT',
    CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS',
    CREATE_EXPENSE_FAIL = 'CREATE_EXPENSE_FAIL',
    // CREATE_EXPENSE_CANCEL = "CREATE_EXPENSE_CANCEL", // TODO: not needed, for now
    //#endregion

    //#region update expense
    UPDATE_EXPENSE_INIT = 'UPDATE_EXPENSE_INIT',
    UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS',
    UPDATE_EXPENSE_FAIL = 'UPDATE_EXPENSE_FAIL',
    //#endregion

    //#region delete expense
    DELETE_EXPENSE_INIT = 'DELETE_EXPENSE_INIT',
    DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS',
    DELETE_EXPENSE_FAIL = 'DELETE_EXPENSE_FAIL',
    //#endregion

    UPDATE_ALL_EXPENSES = 'update_all_expenses',
    UPDATE_ONE_EXPENSE = 'update_one_expense',
    DELETE_EXPENSE = 'delete_expense',
}

export type GetExpensesAction = {
    type:
        | ExpenseActionTypes.GET_EXPENSES_INIT
        | ExpenseActionTypes.GET_EXPENSES_SUCCESS
        | ExpenseActionTypes.GET_EXPENSES_FAIL;
    payload: {
        expenses: readonly Expense[];
    };
};

export type CreateExpenseAction = {
    type:
        | ExpenseActionTypes.CREATE_EXPENSE_INIT
        | ExpenseActionTypes.CREATE_EXPENSE_FAIL
        | ExpenseActionTypes.CREATE_EXPENSE_SUCCESS;
    payload: {
        expense: Expense;
    };
};

export interface UpdateAllExpensesAction {
    type: ExpenseActionTypes.UPDATE_ALL_EXPENSES;
    payload: {
        expenses: ReadonlyArray<Expense>;
    };
}

export type UpdateOneExpenseAction = {
    type:
        | ExpenseActionTypes.UPDATE_EXPENSE_INIT
        | ExpenseActionTypes.UPDATE_EXPENSE_SUCCESS
        | ExpenseActionTypes.UPDATE_EXPENSE_FAIL;
    payload: {
        expense: Expense;
    };
};

export type DeleteExpenseAction = {
    type:
        | ExpenseActionTypes.DELETE_EXPENSE_INIT
        | ExpenseActionTypes.DELETE_EXPENSE_SUCCESS
        | ExpenseActionTypes.DELETE_EXPENSE_FAIL;
    payload: { expenses: readonly Expense[] };
};

export type ExpenseAction =
    | GetExpensesAction
    | CreateExpenseAction
    | UpdateAllExpensesAction
    | UpdateOneExpenseAction
    | DeleteExpenseAction;
