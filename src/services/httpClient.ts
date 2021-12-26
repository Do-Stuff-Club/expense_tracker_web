/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

// ===================================================================
//                             Imports
// ===================================================================
import 'whatwg-fetch';
import {
    AuthHeaders,
    clearAuthInfo,
    getAuthInfo,
    storeAuthInfo,
} from './auth.helper';

// ===================================================================
//                               Types
// ===================================================================
export type Headers = { [key: string]: string | null };

// ===================================================================
//                             Constants
// ===================================================================
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

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
 * @param {boolean} authRequest - Whether or not to automatically handle
 * authentication headers. True by default.
 * @returns {Promise<TReturn>} - Response data
 * @template TReturn - Return type
 */
export const get = async <TReturn>(
    url: string,
    headers: Headers,
    authRequest = true,
): Promise<TReturn> => {
    // set auth headers (access token, etc) depending on authRequest value
    setAuthHeaders(headers, authRequest);

    // make the api call
    const response = await fetch(`${baseURL}${url}`, {
        method: 'GET',
        headers: headers as Record<string, string>,
    });

    // store or clear auth info
    handleAuthInfoPersistance(response);

    // handle http response
    return await handleRequestResponse<TReturn>(response);
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
    const response = await fetch(`${baseURL}${url}`, {
        method: 'post',
        headers: headers as Record<string, string>,
        body: JSON.stringify(data),
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

    const response = await fetch(`${baseURL}${url}`, {
        method: 'delete',
        headers: headers as Record<string, string>,
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

    const response = await fetch(`${baseURL}${url}`, {
        method: 'put',
        headers: headers as Record<string, string>,
        body: JSON.stringify(data),
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

    const response = await fetch(`${baseURL}${url}`, {
        method: 'patch',
        headers: headers as Record<string, string>,
        body: JSON.stringify(data),
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
const handleAuthInfoPersistance = (response: Response) => {
    if (response.status === 401 || response.status === 403) {
        clearAuthInfo();
    } else if (response.headers.get('access-token')) {
        const authHeaders: AuthHeaders = {
            client: response.headers.get('client'),
            expiry: response.headers.get('expiry'),
            uid: response.headers.get('uid'),
            'access-token': response.headers.get('access-token'),
            'token-type': response.headers.get('token-type'),
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
    headers['Content-Type'] = 'application/json';
    if (authRequest) {
        const authInfo = getAuthInfo();

        headers['access-token'] = authInfo?.['access-token'] ?? null;
        headers['token-type'] = authInfo?.['token-type'] ?? null;
        headers['uid'] = authInfo?.uid ?? null;
        headers['expiry'] = authInfo?.expiry ?? null;
        headers['client'] = authInfo?.client ?? null;
    }
};

/**
 * Handles http response errors.
 *
 * @param {AxiosResponse} response - Http response
 * @returns {TReturn} - Response data
 * @template TReturn - Return type
 */
const handleRequestResponse = async <TReturn>(response: Response) => {
    if (response.status === 200) {
        return (await response.json()) as TReturn;
    } else {
        throw Error(`Something went wrong: ${response.statusText}`);
    }
    // TODO: handle other responses
};
//#endregion
