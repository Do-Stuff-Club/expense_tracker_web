import {
    AllExpensesData,
    CreateExpenseParams,
    DeleteExpenseParams,
    ExpenseResponse,
    OneExpenseData,
    QueryExpenseParams,
    UpdateExpenseParams,
} from './types';
import { Expense } from '../../redux/expenses/types';
import { Tag } from '../../redux/tags/types';
import { TagResponse } from '../tag/types';
import { get, httpDelete, post, put } from '../../services/httpClient';

//====================================================
// Export Functions

/**
 * API call to fetch all expense information.
 *
 * @param {number | undefined} userId - input parameters from the page
 * @returns {Promise<AllExpensesData>} promise with data to send to Redux, if successful.
 */
export async function getExpensesCall(
    userId: number | undefined,
): Promise<AllExpensesData> {
    try {
        const data = await get<Array<string>>(
            `/purchases?user_id=${userId}`,
            {},
            {},
        );

        const expenses = data.map((expense: string) => {
            const obj: ExpenseResponse = JSON.parse(expense);
            const tags: ReadonlyArray<Tag> = obj.tags.map(
                (tag: TagResponse) => ({
                    id: tag.id,
                    name: tag.name,
                    childIds: [],
                }),
            );
            return {
                id: obj.id,
                name: obj.name,
                cost: obj.cost,
                date: obj.order_date,
                link: obj.link,
                tags: tags,
            };
        });

        return Promise.resolve({
            expenses,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to create a new expense.
 *
 * @param {CreateExpenseParams} params - input parameters from the page
 * @returns {Promise<OneExpenseData>} promise with data to send to Redux, if successful.
 */
export async function createExpenseCall(
    params: CreateExpenseParams,
): Promise<OneExpenseData> {
    try {
        const data = await post<ExpenseResponse>(
            '/purchases',
            {},
            {
                purchase: {
                    name: params.name,
                    cost: params.cost,
                    order_date: params.date,
                    link: params.link,
                    tag_ids: params.tags.map((tag) => tag.id),
                },
            },
        );

        console.log('POST /purchases ', data);

        const obj: ExpenseResponse = data;
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: TagResponse) => ({
            id: tag.id,
            name: tag.name,
            childIds: [],
        }));
        const expense = {
            id: obj.id,
            name: obj.name,
            cost: obj.cost,
            date: obj.order_date,
            link: obj.link,
            tags: tags,
        };
        return Promise.resolve({
            expense: expense,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to delete an expense.
 *
 * @param {DeleteExpenseParams} params - input parameters from the page
 * @returns {Promise<AllExpensesData>} promise with data to send to Redux, if successful.
 */
export async function deleteExpenseCall(
    params: DeleteExpenseParams,
): Promise<AllExpensesData> {
    try {
        const data = await httpDelete<Array<string>>(
            `/purchases/${params.id}`,
            {},
            undefined,
        );
        const expenses: ReadonlyArray<Expense> = data.map((expense: string) => {
            const obj: ExpenseResponse = JSON.parse(expense);
            const tags: ReadonlyArray<Tag> = obj.tags.map(
                (tag: TagResponse) => ({
                    id: tag.id,
                    name: tag.name,
                    childIds: [],
                }),
            );
            return {
                id: obj.id,
                name: obj.name,
                cost: obj.cost,
                date: obj.order_date,
                link: obj.link,
                tags: tags,
            };
        });
        return Promise.resolve({
            expenses: expenses,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to update an expense.
 *
 * @param {UpdateExpenseParams} params - input parameters from the page
 * @returns {Promise<AllExpensesData>} promise with data to send to Redux, if successful.
 */
export async function updateExpenseCall(
    params: UpdateExpenseParams,
): Promise<OneExpenseData> {
    try {
        const data = await put<ExpenseResponse>(
            `/purchases/${params.expense.id}`,
            {},
            {
                name: params.expense.name,
                cost: params.expense.cost,
                order_date: params.expense.date,
                link: params.expense.link,
                tag_ids: params.expense.tags.map((tag) => tag.id),
            },
        );

        const tags: ReadonlyArray<Tag> = data.tags.map((tag: TagResponse) => ({
            id: tag.id,
            name: tag.name,
            childIds: [],
        }));
        const expense = {
            id: data.id,
            name: data.name,
            cost: data.cost,
            date: data.order_date,
            link: data.link,
            tags: tags,
        };
        return Promise.resolve({
            expense: expense,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to query expenses using dates and tags
 *
 * @param {number | undefined} userId - logged-in user ID
 * @param {QueryExpenseParams} params - input parameters from the page
 * @returns {Promise<AllExpensesData>} promise with data to send to Redux, if successful.
 */
export async function queryExpensesCall(
    params: QueryExpenseParams,
): Promise<AllExpensesData> {
    try {
        const data = await get<Array<string>>(
            `/select_purchases?user_id=${params.user_id}`,
            {},
            {
                filters: {
                    start_date: params.start_date,
                    end_date: params.end_date,
                    tag_ids: params.tags.map((tag) => tag.id),
                },
            },
        );

        const expenses = data.map((expense: string) => {
            const obj: ExpenseResponse = JSON.parse(expense);
            const tags: ReadonlyArray<Tag> = obj.tags.map(
                (tag: TagResponse) => ({
                    id: tag.id,
                    name: tag.name,
                    childIds: [],
                }),
            );
            return {
                id: obj.id,
                name: obj.name,
                cost: obj.cost,
                date: obj.order_date,
                link: obj.link,
                tags: tags,
            };
        });

        return Promise.resolve({
            expenses,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
