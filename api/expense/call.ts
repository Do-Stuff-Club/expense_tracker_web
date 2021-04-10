import axios from 'axios';
import qs from 'qs';
import {
    AllExpensesData,
    CreateExpenseParams,
    DeleteExpenseParams,
    ExpenseResponse,
    GetExpenseParams,
    OneExpenseData,
    UpdateExpenseParams,
} from './types';
import { Expense } from '../../redux/expenses/types';
import { Tag } from '../../redux/tags/types';
import { TagResponse } from '../tag/types';

//====================================================
// Export Functions

export async function getExpensesCall(
    params: GetExpenseParams,
): Promise<AllExpensesData> {
    try {
        const response = await axios({
            method: 'get',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/expenses',
            params: { user_id: params.user_id },
            headers: params.headers,
        });
        const expenses: ReadonlyArray<Expense> = response.data.map(
            (expense: string) => {
                const obj: ExpenseResponse = JSON.parse(expense);
                const tags: ReadonlyArray<Tag> = obj.tags.map(
                    (tag: TagResponse) => ({
                        id: tag.id,
                        name: tag.name,
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
            },
        );
        return Promise.resolve({
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            expenses: expenses,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

//===========================================================

export async function createExpenseCall(
    params: CreateExpenseParams,
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
            method: 'post',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/expense',
            params: {
                expense: {
                    name: params.name,
                    cost: params.cost,
                    date: params.date,
                    link: params.link,
                    tags_attributes: params.tags.map((tag) => ({ name: tag })),
                },
            },
            headers: params.headers,
        });

        const obj: ExpenseResponse = response.data;
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: TagResponse) => ({
            id: tag.id,
            name: tag.name,
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

//=======================================================

export async function deleteExpenseCall(
    params: DeleteExpenseParams,
): Promise<AllExpensesData> {
    try {
        const response = await axios({
            method: 'delete',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/expenses/' + params.id,
            headers: params.headers,
        });
        const expenses: ReadonlyArray<Expense> = response.data.map(
            (expense: string) => {
                const obj: ExpenseResponse = JSON.parse(expense);
                const tags: ReadonlyArray<Tag> = obj.tags.map(
                    (tag: TagResponse) => ({
                        id: tag.id,
                        name: tag.name,
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
            },
        );
        return Promise.resolve({
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            expenses: expenses,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

//========================================

export async function updateExpenseCall(
    params: UpdateExpenseParams,
): Promise<AllExpensesData> {
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
            method: 'post',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/expenses',
            params: {
                expense: {
                    name: params.expense.name,
                },
            },
            headers: params.headers,
        });

        const expenses: ReadonlyArray<Expense> = response.data.map(
            (expense: string) => {
                const obj: ExpenseResponse = JSON.parse(expense);
                const tags: ReadonlyArray<Tag> = obj.tags.map(
                    (tag: TagResponse) => ({
                        id: tag.id,
                        name: tag.name,
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
            },
        );
        return Promise.resolve({
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            expenses: expenses, // FIXME why does this return multiple expenses?
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
