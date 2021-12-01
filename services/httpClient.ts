/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { AuthHeaders } from '../redux/user/types';
import { clearAuthInfo, getAuthInfo, storeAuthInfo } from './auth.helper';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Makes a 'GET' request
 *
 * @param {string} url Request url
 * @param {Object.<string, string | undefined>} headers request headers
 * @param {boolean} authRequest if true then auth info is automatically added (true by default)
 * @returns {Promise<any>} response data
 */
export const get = async (
    url: string,
    headers: { [key: string]: string | undefined },
    authRequest = true,
): Promise<any> => {
    setAuthHeaders(headers, authRequest);

    // make the api call
    const response = await axios({ method: 'get', url, baseURL, headers });

    // store or clear auth info
    handleAuthInfoPersistance(response);

    // handle http response
    return handleRequestResponse(response);
};

/**
 * Makes a 'POST' request
 *
 * @param {string} url Request url
 * @param {Object.<string, string | undefined>} headers request headers
 * @param {any} data request body
 * @param {boolean} authRequest if true then auth info is automatically added (true by default)
 * @returns {Promise<any>} response data
 */
export const post = async (
    url: string,
    headers: { [key: string]: string | undefined },
    data: any,
    authRequest = true,
): Promise<any> => {
    console.log("Initiating 'POST' request");
    setAuthHeaders(headers, authRequest);

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
    return handleRequestResponse(response);
};

/**
 * Makes a 'DELETE' request
 *
 * @param {string} url Request url
 * @param {Object.<string, string | undefined>} headers request headers
 * @param {any} params request body
 * @param {boolean} authRequest if true then auth info is automatically added (true by default)
 * @returns {Promise<any>} response data
 */
export const httpDelete = async (
    url: string,
    headers: { [key: string]: string | undefined },
    params: any,
    authRequest = true,
): Promise<any> => {
    setAuthHeaders(headers, authRequest);

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
    return handleRequestResponse(response);
};

/**
 * Makes a 'PUT' request
 *
 * @param {string} url Request url
 * @param {Object.<string, string | undefined>} headers request headers
 * @param {any} data request body
 * @param {boolean} authRequest if true then auth info is automatically added (true by default)
 * @returns {Promise<any>} response data
 */
export const put = async (
    url: string,
    headers: { [key: string]: string | undefined },
    data: any,
    authRequest = true,
): Promise<any> => {
    setAuthHeaders(headers, authRequest);

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
    return handleRequestResponse(response);
};

//#region internal methods
/**
 * Handles auth info persistance, if response is 401 or 403 auth info is cleared, otherwise it's persisted
 *
 * @param {AxiosResponse} response http response
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
 * Updates auth headers if necessary
 *
 * @param {Object.<string, string | undefined>} headers request headers
 * @param {boolean} authRequest is this an authenticated request (true by default)
 */
const setAuthHeaders = (
    headers: { [key: string]: string | undefined },
    authRequest = true,
) => {
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
 * Handles http response
 *
 * @param {AxiosResponse} response Http response
 * @returns {any} response data
 */
const handleRequestResponse = (response: AxiosResponse) => {
    if (response.status === 200) {
        return response.data;
    } else {
        throw Error(`Something went wrong: ${response.statusText}`);
    }
    // TODO: handle other responses
};
//#endregion
