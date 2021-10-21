// ===================================================================
//                             Imports
// ===================================================================
import axios from 'axios';
import qs from 'qs';
import {
    AllTagsData,
    CreateTagParams,
    DeleteTagParams,
    GetTagParams,
    OneTagData,
    TagResponse,
    UpdateTagParams,
} from './types';
import { Tag } from '../../redux/tags/types';
// ===================================================================
//                       Helper Functions
// ===================================================================

/**
 * Converts a tag API call response data to a tag object.
 *
 * @param {TagResponse} resp - response object from the API call
 * @returns {Tag} tag object that can be sent to the Redux store
 */
function tagFromResponse(resp: TagResponse): Tag {
    return {
        id: resp.id,
        name: resp.name,
        parentId: resp.parent_id,
        childIds: resp.children_ids ? resp.children_ids : [],
    };
}

// ===================================================================
//                             API Calls
// ===================================================================

/**
 * API call to fetch all tag information.
 *
 * @param {GetTagParams} params - input parameters from the page
 * @returns {Promise<AllTagsData>} promise with data to send to Redux, if successful.
 */
export async function getTagsCall(params: GetTagParams): Promise<AllTagsData> {
    try {
        const response = await axios({
            method: 'get',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/tags',
            headers: params.headers,
        });
        const tags: ReadonlyArray<Tag> = response.data.map((tag: string) => {
            const resp: TagResponse = JSON.parse(tag);
            return tagFromResponse(resp);
        });
        return Promise.resolve({
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            tags: tags,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to create a new tag.
 *
 * @param {CreateTagParams} params - input parameters from the page
 * @returns {Promise<OneTagData>} promise with data to send to Redux, if successful.
 */
export async function createTagCall(
    params: CreateTagParams,
): Promise<OneTagData> {
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
        const reqParams: { name: string; parent_id?: number } = {
            name: params.name,
        };
        if (params.parent_id) {
            reqParams.parent_id = params.parent_id;
        }
        const response = await axios({
            method: 'post',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/tags/',
            params: reqParams,
            headers: params.headers,
        });
        const resp: TagResponse = response.data;
        const tag = tagFromResponse(resp);

        return Promise.resolve({
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            tag: tag,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to update a tag.
 *
 * @param {UpdateTagParams} params - input parameters from the page
 * @returns {Promise<OneTagData>} promise with data to send to Redux, if successful.
 */
export async function updateTagCall(
    params: UpdateTagParams,
): Promise<OneTagData> {
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
        const reqParams: {
            name: string;
            parent_id?: number;
        } = {
            name: params.name,
        };
        if (params.parent_id) {
            reqParams.parent_id = params.parent_id;
        }
        const response = await axios({
            method: 'patch',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/tags/' + params.id,
            params: reqParams,
            headers: params.headers,
        });
        const resp: TagResponse = response.data;
        const tag = tagFromResponse(resp);

        return Promise.resolve({
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            tag: tag,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * API call to delete a tag.
 *
 * @param {DeleteTagParams} params - input parameters from the page
 * @returns {Promise<OneTagData>} promise with data to send to Redux, if successful.
 */
export async function deleteTagCall(
    params: DeleteTagParams,
): Promise<OneTagData> {
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
            url: '/tags/' + params.id,
            headers: params.headers,
        });
        const resp: TagResponse = response.data;
        const tag = tagFromResponse(resp);

        return Promise.resolve({
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
            tag: tag,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
