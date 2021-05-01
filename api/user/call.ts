// ===================================================================
//                             Imports
// ===================================================================
import axios from 'axios';
import { LoginParams, NewUserParams, UserData } from './types';

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
        const response = await axios({
            method: 'post',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/auth',
            params: params,
        });

        return Promise.resolve({
            id: response.data.data.id,
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
        });
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message); // FIXME
        }
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
        const response = await axios({
            method: 'post',
            baseURL: 'https://expense-tracker-test-api.herokuapp.com/',
            url: '/auth/sign_in',
            params: params,
        });

        return Promise.resolve({
            id: response.data.data.id,
            authHeaders: {
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid'],
                'access-token': response.headers['access-token'],
                'token-type': response.headers['token-type'],
            },
        });
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        return Promise.reject(error);
    }
}
