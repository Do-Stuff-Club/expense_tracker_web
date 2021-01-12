import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AuthHeaders } from '../user/types';
import { TagActionTypes } from './types';

export interface FetchTagParams {
    user_id: number
    headers: AuthHeaders
}

export const fetchTags = (params: FetchTagParams): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async dispatch => {
    try {
        console.log("fetchTags!")
        const response = await axios({
            method: "get",
            baseURL: "https://expense-tracker-test-api.herokuapp.com/",
            url: "/categories",
            params: { user_id: params.user_id },
            headers: params.headers
        })
        console.log(response)

        dispatch({
            type: TagActionTypes.FETCH,
            payload: {
                authHeaders: {
                    client: response.headers["client"],
                    expiry: response.headers["expiry"],
                    uid: response.headers["uid"],
                    "access-token": response.headers["access-token"],
                    "token-type": response.headers["token-type"],
                }
            }
        })

        return Promise.resolve("a fancy message")// FIXME
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return Promise.reject(error)
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message); // FIXME
        }
    }
}