import { AuthHeaders } from "../user/types";
import { Tag } from "../tags/types";

export interface Expense {
    name: string;
    id: number;
    cost: number;
    date: string;
    link: string;
    tags: ReadonlyArray<Tag>
}

// TODO: figure out what to do for ExpenseState
export interface ExpenseState {

}

export enum ExpenseActionTypes {
    CREATE_EXPENSE = "create_expense",
    UPDATE_EXPENSE = "update_expense"
    // DELETE_EXPENSE = why don't we need this?
}

export interface CreateExpense {
    type: ExpenseActionTypes.CREATE_EXPENSE;
    payload: {
        expense: Expense;
        authHeaders: AuthHeaders;
    };
}

export interface UpdateExpense {
    type: ExpenseActionTypes.UPDATE_EXPENSE;
    payload: {
        expense: Expense;
        authHeaders: AuthHeaders;
    }
}

export type ExpenseAction = 
  | CreateExpense
  | UpdateExpense