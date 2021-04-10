import axios from 'axios';
import qs from 'qs';
import {
    AllCategoriesData,
    CategoryResponse,
    CreateCategoryParams,
    CreateTagParams,
    DeleteCategoryParams,
    DeleteTagParams,
    GetTagParams,
    OneCategoryData,
    TagResponse,
    UpdateCategoryParams,
    UpdateTagParams,
} from './types';
import { Category, Tag } from '../../redux/tags/types';

//==================================================
// Export functions

export async function getTagsCall(
    params: GetTagParams,
): Promise<AllCategoriesData> {
    try {
        const response = await axios({
            method: 'get',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/categories',
            params: { user_id: params.user_id },
            headers: params.headers,
        });
        const categories: ReadonlyArray<Category> = response.data.map(
            (category: string) => {
                const obj: CategoryResponse = JSON.parse(category);
                const tags: ReadonlyArray<Tag> = obj.tags.map(
                    (tag: TagResponse) => ({
                        id: tag.id,
                        name: tag.name,
                    }),
                );
                return {
                    id: obj.id,
                    name: obj.name,
                    required: obj.required,
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
            categories: categories,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

//==================================================

export async function createCategoryCall(
    params: CreateCategoryParams,
): Promise<OneCategoryData> {
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
            url: '/categories',
            params: {
                category: {
                    name: params.name,
                    required: params.required,
                    tags_attributes: params.tags.map((tag) => ({ name: tag })),
                },
            },
            headers: params.headers,
        });
        console.log(response);
        const obj: CategoryResponse = response.data;
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: TagResponse) => ({
            id: tag.id,
            name: tag.name,
        }));
        const category = {
            id: obj.id,
            name: obj.name,
            required: obj.required,
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
            category: category,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

//==================================================

export async function deleteCategoryCall(
    params: DeleteCategoryParams,
): Promise<AllCategoriesData> {
    try {
        const response = await axios({
            method: 'delete',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/categories/' + params.id,
            headers: params.headers,
        });
        console.log(response)
        const categories: ReadonlyArray<Category> = response.data.map(
            (category: string) => {
                const obj: CategoryResponse = JSON.parse(category);
                const tags: ReadonlyArray<Tag> = obj.tags.map(
                    (tag: TagResponse) => ({
                        id: tag.id,
                        name: tag.name,
                    }),
                );
                return {
                    id: obj.id,
                    name: obj.name,
                    required: obj.required,
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
            categories: categories,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

//==================================================

export async function updateCategoryCall(
    params: UpdateCategoryParams,
): Promise<AllCategoriesData> {
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
            url: '/categories',
            params: {
                category: {
                    name: params.category.name,
                    required: params.category.required,
                },
            },
            headers: params.headers,
        });

        const categories: ReadonlyArray<Category> = response.data.map(
            (category: string) => {
                const obj: CategoryResponse = JSON.parse(category);
                const tags: ReadonlyArray<Tag> = obj.tags.map(
                    (tag: TagResponse) => ({
                        id: tag.id,
                        name: tag.name,
                    }),
                );
                return {
                    id: obj.id,
                    name: obj.name,
                    required: obj.required,
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
            categories: categories, // FIXME why does this return multiple categories?
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

//==================================================

export async function createTagCall(
    params: CreateTagParams,
): Promise<OneCategoryData> {
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
            url: '/categories/' + params.category.id + '/tags',
            params: {
                tag: {
                    name: params.name,
                },
            },
            headers: params.headers,
        });
        const obj: CategoryResponse = response.data;
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: TagResponse) => ({
            id: tag.id,
            name: tag.name,
        }));
        const category = {
            id: obj.id,
            name: obj.name,
            required: obj.required,
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
            category: category,
        });
    } catch (error) {
        return Promise.resolve(error);
    }
}

//==================================================

export async function deleteTagCall(
    params: DeleteTagParams,
): Promise<OneCategoryData> {
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
            method: 'delete',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/categories/' + params.category.id + '/tags/' + params.id,
            headers: params.headers,
        });
        const obj: CategoryResponse = response.data;
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: TagResponse) => ({
            id: tag.id,
            name: tag.name,
        }));
        const category = {
            id: obj.id,
            name: obj.name,
            required: obj.required,
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
            category: category,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

//==================================================

export async function updateTagCall(
    params: UpdateTagParams,
): Promise<OneCategoryData> {
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
            method: 'patch',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/categories/' + params.category.id + '/tags/' + params.tag.id,
            params: {
                tag: {
                    name: params.tag.name,
                },
            },
            headers: params.headers,
        });
        const obj: CategoryResponse = response.data;
        const tags: ReadonlyArray<Tag> = obj.tags.map((tag: TagResponse) => ({
            id: tag.id,
            name: tag.name,
        }));
        const category = {
            id: obj.id,
            name: obj.name,
            required: obj.required,
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
            category: category,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
