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
}

export enum ExpenseActionTypes {
    CREATE_EXPENSE = 'create_expense',
    //#region create expense
    CREATE_EXPENSE_INIT = 'CREATE_EXPENSE_INIT',
    CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS',
    CREATE_EXPENSE_FAIL = 'CREATE_EXPENSE_FAIL',
    // CREATE_EXPENSE_CANCEL = "CREATE_EXPENSE_CANCEL", // TODO: not needed, for now
    //#endregion
    UPDATE_ALL_EXPENSES = 'update_all_expenses',
    UPDATE_ONE_EXPENSE = 'update_one_expense',
    DELETE_EXPENSE = 'delete_expense',
}

export interface CreateExpenseAction {
    type:
        | ExpenseActionTypes.CREATE_EXPENSE
        | ExpenseActionTypes.CREATE_EXPENSE_INIT
        | ExpenseActionTypes.CREATE_EXPENSE_FAIL
        | ExpenseActionTypes.CREATE_EXPENSE_SUCCESS;
    payload: {
        expense: Expense;
    };
}

export interface UpdateAllExpensesAction {
    type: ExpenseActionTypes.UPDATE_ALL_EXPENSES;
    payload: {
        expenses: ReadonlyArray<Expense>;
    };
}

export interface UpdateOneExpenseAction {
    type: ExpenseActionTypes.UPDATE_ONE_EXPENSE;
    payload: {
        expense: Expense;
    };
}

export interface DeleteExpenseAction {
    type: ExpenseActionTypes.DELETE_EXPENSE;
    payload: {
        expense: Expense;
    };
}

export type ExpenseAction =
    | CreateExpenseAction
    | UpdateAllExpensesAction
    | UpdateOneExpenseAction
    | DeleteExpenseAction;
