import { Expense } from '../../redux/expenses/types';
import { Tag } from '../../redux/tags/types';
import { TagResponse } from '../tag/types';

export interface CreateExpenseParams {
    name: string;
    cost: number;
    date: string;
    link: string;
    tags: ReadonlyArray<Tag>;
}

export interface DeleteExpenseParams {
    id: number;
}

export interface UpdateExpenseParams {
    expense: Expense;
}

export interface QueryExpenseParams {
    start_date: Date;
    end_date: Date;
    tags: ReadonlyArray<Tag>;
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
    expenses: ReadonlyArray<Expense>;
}

export interface OneExpenseData {
    expense: Expense;
}
