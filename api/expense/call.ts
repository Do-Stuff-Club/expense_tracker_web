import axios from 'axios';
import qs from 'qs';
import {
    AllExpensesData,
    CreateExpenseParams,
    DeleteExpenseParams,
    ExpenseResponse,
    OneExpenseData,
    UpdateExpenseParams,
} from './types';
import { Expense } from '../../redux/expenses/types';
import { Tag } from '../../redux/tags/types';
import { TagResponse } from '../tag/types';
import { get, httpDelete, post } from '../../services/httpClient';

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
        const data = await get(`/purchases?user_id=${userId}`, {});

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
        const data = await post(
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
        const data = await httpDelete(`/purchases/${params.id}`, {}, undefined);
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
        // Format nested params correctly
        // FIXME maybe let's move off axios since it has this stupid bug
        axios.interceptors.request.use((config) => {
            window.console.log(config);

            config.paramsSerializer = (params) => {
                return qs.stringify(params, {
                    arrayFormat: 'brackets',
                    encode: false,
                });
            };

            return config;
        });
        const response = await axios({
            method: 'put',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/purchases/' + params.expense.id,
            params: {
                purchase: {
                    name: params.expense.name,
                    cost: params.expense.cost,
                    order_date: params.expense.date,
                    link: params.expense.link,
                    tag_ids: params.expense.tags.map((tag) => tag.id),
                },
            },
            headers: params.headers,
        });

        const obj: ExpenseResponse = response.data;
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
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            expense: expense,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
