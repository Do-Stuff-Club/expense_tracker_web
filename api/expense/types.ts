import { Expense } from '../../redux/expenses/types';
import { Tag } from '../../redux/tags/types';
import { AuthHeaders } from '../../redux/user/types';
import { TagResponse } from '../tag/types';

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

export interface ExpenseResponse {
    id: number;
    name: string;
    order_date: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    cost: number;
    quantity: number;
    description: string;
    link: string;
    tags: Array<TagResponse>;
}

export interface AllExpensesData {
    authHeaders: AuthHeaders;
    expenses: ReadonlyArray<Expense>;
}

export interface OneExpenseData {
    authHeaders: AuthHeaders;
    expense: Expense;
}
