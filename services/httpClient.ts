import axios, { AxiosResponse } from 'axios';
import { AuthHeaders } from '../redux/user/types';
import { clearAuthInfo, getAuthInfo, storeAuthInfo } from './auth.helper';

console.log(process.env);

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
// const baseURL = 'https://expense-tracker-test-api.herokuapp.com/';

/**
 * Makes a 'GET' request
 * @param url Request url
 * @param headers request headers
 * @param authRequest if true then auth info is automatically added (true by default)
 * @returns response data
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
 * @param url Request url
 * @param headers request headers
 * @param params request body
 * @param authRequest if true then auth info is automatically added (true by default)
 * @returns response data
 */
export const post = async (
    url: string,
    headers: { [key: string]: string | undefined },
    params: any,
    authRequest = true,
): Promise<any> => {
    console.log("Initiating 'POST' request");
    setAuthHeaders(headers, authRequest);

    const response = await axios({
        method: 'post',
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
 * Makes a 'DELETE' request
 * @param url Request url
 * @param headers request headers
 * @param params request body
 * @param authRequest if true then auth info is automatically added (true by default)
 * @returns response data
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
 * @param url Request url
 * @param headers request headers
 * @param params request body
 * @param authRequest if true then auth info is automatically added (true by default)
 * @returns response data
 */
export const put = async (
    url: string,
    headers: { [key: string]: string | undefined },
    params: any,
    authRequest = true,
): Promise<any> => {
    setAuthHeaders(headers, authRequest);

    const response = await axios({
        method: 'put',
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

//#region internal methods
/**
 * Handles auth info persistance, if response is 401 or 403 auth info is cleared, otherwise it's persisted
 * @param response http response
 */
const handleAuthInfoPersistance = (response: AxiosResponse) => {
    if (response.status === 401 || response.status === 403) {
        clearAuthInfo();
    } else {
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
 * @param headers request headers
 * @param authRequest is this an authenticated request (true by default)
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
 * @param response Http response
 * @returns
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
