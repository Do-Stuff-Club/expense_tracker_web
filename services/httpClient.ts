/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

// ===================================================================
//                             Imports
// ===================================================================
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import {
    AuthHeaders,
    clearAuthInfo,
    getAuthInfo,
    storeAuthInfo,
} from './auth.helper';

// ===================================================================
//                               Types
// ===================================================================
export type Headers = { [key: string]: string | undefined };

// ===================================================================
//                             Constants
// ===================================================================
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// See https://github.com/axios/axios/issues/738
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

// ===================================================================
//                             Functions
// ===================================================================
/**
 * Makes a 'GET' request while setting authentication headers automatically
 * (which are persisted to local storage).
 *
 * The automatic authentication header
 * handling can be disabled using the authRequest argument.
 *
 * @param {string} url - Request url
 * @param {Headers} headers - Request headers
 * @param {any} params - Request body
 * @param {boolean} authRequest - Whether or not to automatically handle
 * authentication headers. True by default.
 * @returns {Promise<TReturn>} - Response data
 * @template TReturn - Return type
 */
export const get = async <TReturn>(
    url: string,
    headers: Headers,
    params: any,
    authRequest = true,
): Promise<TReturn> => {
    // set auth headers (access token, etc) depending on authRequest value
    setAuthHeaders(headers, authRequest);

    // make the api call
    const response = await axios({
        method: 'get',
        url,
        baseURL,
        headers,
        params,
    });

    // store or clear auth info
    handleAuthInfoPersistance(response);

    // handle http response
    return handleRequestResponse<TReturn>(response);
};

/**
 * Makes a 'POST' request while setting authentication headers automatically
 * (which are persisted to local storage).
 *
 * The automatic authentication header
 * handling can be disabled using the authRequest argument.
 *
 * @param {string} url - Request url
 * @param {Headers} headers - Request headers
 * @param {any} data - Request body
 * @param {boolean} authRequest - Whether or not to automatically handle
 * authentication headers. True by default.
 * @returns {Promise<TReturn>} - Response data
 * @template TReturn - Return type
 */
export const post = async <TReturn>(
    url: string,
    headers: Headers,
    data: any,
    authRequest = true,
): Promise<TReturn> => {
    // set auth headers (access token, etc) depending on authRequest value
    setAuthHeaders(headers, authRequest);

    // make the api call
    const response = await axios({
        method: 'post',
        url,
        baseURL,
        headers,
        data,
    });

    // store or clear auth info
    handleAuthInfoPersistance(response);

    // handle http response
    return handleRequestResponse<TReturn>(response);
};

/**
 * Makes a 'Delete' request while setting authentication headers automatically
 * (which are persisted to local storage).
 *
 * The automatic authentication header
 * handling can be disabled using the authRequest argument.
 *
 * @param {string} url - Request url
 * @param {Headers} headers - Request headers
 * @param {any} params - Request body
 * @param {boolean} authRequest - Whether or not to automatically handle
 * authentication headers. True by default.
 * @returns {Promise<TReturn>} - Response data
 * @template TReturn - Return type
 */
export const httpDelete = async <TReturn>(
    url: string,
    headers: Headers,
    params: any,
    authRequest = true,
): Promise<TReturn> => {
    // set auth headers (access token, etc) depending on authRequest value
    setAuthHeaders(headers, authRequest);

    // make the api call
    const response = await axios({
        method: 'delete',
        url,
        baseURL,
        headers,
        params,
    });

    // store or clear auth info
    handleAuthInfoPersistance(response);

    // handle http response
    return handleRequestResponse<TReturn>(response);
};

/**
 * Makes a 'PUT' request while setting authentication headers automatically
 * (which are persisted to local storage).
 *
 * The automatic authentication header
 * handling can be disabled using the authRequest argument.
 *
 * @param {string} url - Request url
 * @param {Headers} headers - Request headers
 * @param {any} data - Request body
 * @param {boolean} authRequest - Whether or not to automatically handle
 * authentication headers. True by default.
 * @returns {Promise<TReturn>} - Response data
 * @template TReturn - Return type
 */
export const put = async <TReturn>(
    url: string,
    headers: Headers,
    data: any,
    authRequest = true,
): Promise<TReturn> => {
    // set auth headers (access token, etc) depending on authRequest value
    setAuthHeaders(headers, authRequest);

    // make the api call
    const response = await axios({
        method: 'put',
        url,
        baseURL,
        headers,
        data,
    });

    // store or clear auth info
    handleAuthInfoPersistance(response);

    // handle http response
    return handleRequestResponse<TReturn>(response);
};

/**
 * Makes a 'PATCH' request while setting authentication headers automatically
 * (which are persisted to local storage).
 *
 * The automatic authentication header
 * handling can be disabled using the authRequest argument.
 *
 * @param {string} url - Request url
 * @param {Headers} headers - Request headers
 * @param {any} data - Request body
 * @param {boolean} authRequest - Whether or not to automatically handle
 * authentication headers. True by default.
 * @returns {Promise<TReturn>} - Response data
 * @template TReturn - Return type
 */
export const patch = async <TReturn>(
    url: string,
    headers: Headers,
    data: any,
    authRequest = true,
): Promise<TReturn> => {
    // set auth headers (access token, etc) depending on authRequest value
    setAuthHeaders(headers, authRequest);

    // make the api call
    const response = await axios({
        method: 'patch',
        url,
        baseURL,
        headers,
        data,
    });

    // store or clear auth info
    handleAuthInfoPersistance(response);

    // handle http response
    return handleRequestResponse<TReturn>(response);
};

//#region internal methods
/**
 * Handles auth info persistance, if response is 401 or 403 auth info is cleared, otherwise it's persisted
 *
 * @param {AxiosResponse} response - http response
 */
const handleAuthInfoPersistance = (response: AxiosResponse) => {
    if (response.status === 401 || response.status === 403) {
        clearAuthInfo();
    } else if (response.headers['access-token']) {
        const authHeaders: AuthHeaders = {
            client: response.headers['client'],
            expiry: response.headers['expiry'],
            uid: response.headers['uid'],
            'access-token': response.headers['access-token'],
            'token-type': response.headers['token-type'],
        };
        storeAuthInfo(authHeaders);
    }
};

/**
 * Updates auth headers, if necessary.
 *
 * @param {Headers} headers - Request headers
 * @param {boolean} authRequest - Is this an authenticated request (true by default)
 */
const setAuthHeaders = (headers: Headers, authRequest = true) => {
    if (authRequest) {
        const authInfo = getAuthInfo();

        headers['access-token'] = authInfo?.['access-token'];
        headers['token-type'] = authInfo?.['token-type'];
        headers['uid'] = authInfo?.uid;
        headers['expiry'] = authInfo?.expiry;
        headers['client'] = authInfo?.client;
    }
};

/**
 * Handles http response errors.
 *
 * @param {AxiosResponse} response - Http response
 * @returns {TReturn} - Response data
 * @template TReturn - Return type
 */
const handleRequestResponse = <TReturn>(response: AxiosResponse) => {
    if (response.status === 200) {
        return response.data as TReturn;
    } else {
        throw Error(`Something went wrong: ${response.statusText}`);
    }
    // TODO: handle other responses
};
//#endregion
