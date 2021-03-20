import { Expense } from "../../redux/expenses/types";
import { Tag } from "../../redux/tags/types";
import { AuthHeaders } from "../../redux/user/types";

export interface GetExpenseParams {
    user_id: number;
    headers: AuthHeaders;
}

export interface CreateExpenseParams {
    name: string;
    cost: number;
    date: string;
    link: string;
    tags: ReadonlyArray<Tag>;
    headers: AuthHeaders;
}

export interface DeleteExpenseParams {
    id: number;
    headers: AuthHeaders;
}

export interface UpdateExpenseParams {
    expense: Expense;
    headers: AuthHeaders;
}

export interface AllExpensesData {
    authHeaders: AuthHeaders;
    expenses: ReadonlyArray<Expense>;
}

export interface OneExpenseData {
    authHeaders: AuthHeaders;
    expense: Expense;
}