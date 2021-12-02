// ===================================================================
//                             Imports
// ===================================================================
import { LoginParams, NewUserParams, UserData } from './types';
import { post } from '../../services/httpClient';

// ===================================================================
//                             API Calls
// ===================================================================

/**
 * API call to create a new user.
 *
 * @param {NewUserParams} params - input parameters from the page.
 * @returns {Promise<UserData>} promise with data to send to Redux, if successful.
 */
export async function newUserCall(params: NewUserParams): Promise<UserData> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await post<any>('/auth', {}, params);

        return Promise.resolve({
            id: data.data.id,
        });
    } catch (error) {
        // if (error.response) {
        //     // The request was made and the server responded with a status code
        //     // that falls out of the range of 2xx
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        // } else if (error.request) {
        //     // The request was made but no response was received
        //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //     // http.ClientRequest in node.js
        //     console.log(error.request);
        // } else {
        //     // Something happened in setting up the request that triggered an Error
        //     console.log('Error', error.message); // FIXME
        // }
        return Promise.reject(error);
    }
}

/**
 * API call to log in a user.
 *
 * @param {LoginParams} params - input parameters from the page.
 * @returns {Promise<UserData>} promise with data to send to Redux, if successful.
 */
export async function loginCall(params: LoginParams): Promise<UserData> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await post<any>('/auth/sign_in', {}, params);

        return Promise.resolve({
            id: data.data.id,
        });
    } catch (error) {
        // if (error.response) {
        //     // The request was made and the server responded with a status code
        //     // that falls out of the range of 2xx
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        // } else if (error.request) {
        //     // The request was made but no response was received
        //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //     // http.ClientRequest in node.js
        //     console.log(error.request);
        // } else {
        //     // Something happened in setting up the request that triggered an Error
        //     console.log('Error', error.message);
        // }
        return Promise.reject(error);
    }
}
