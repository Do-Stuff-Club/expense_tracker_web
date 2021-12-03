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
    DELETE_EXPENSE = 'delete_expense',
}

export interface CreateExpenseAction {
    type: ExpenseActionTypes.CREATE_EXPENSE;
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
