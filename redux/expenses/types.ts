import { AuthHeaders } from '../user/types';
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
    UPDATE_ALL_EXPENSES = 'update_all_expenses',
    UPDATE_ONE_EXPENSE = 'update_one_expense',
    // DELETE_EXPENSE = why don't we need this?
}

export interface CreateExpenseAction {
    type: ExpenseActionTypes.CREATE_EXPENSE;
    payload: {
        expense: Expense;
        authHeaders: AuthHeaders;
    };
}

export interface UpdateAllExpensesAction {
    type: ExpenseActionTypes.UPDATE_ALL_EXPENSES;
    payload: {
        expenses: ReadonlyArray<Expense>;
        authHeaders: AuthHeaders;
    };
}

export interface UpdateOneExpenseAction {
    type: ExpenseActionTypes.UPDATE_ONE_EXPENSE;
    payload: {
        expense: Expense;
        authHeaders: AuthHeaders;
    };
}

export type ExpenseAction =
    | CreateExpenseAction
    | UpdateAllExpensesAction
    | UpdateOneExpenseAction;
