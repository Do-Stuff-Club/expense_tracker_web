import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { UserActionTypes, UserLoginAction } from './types';

export interface SignUpParams {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

// FIXME change Promise<any> to more restricted type
export const signUp = (params: SignUpParams): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const response = await axios({
            method: "post",
            baseURL: "https://expense-tracker-test-api.herokuapp.com/",
            url: "/auth",
            params: params,
        })

        dispatch({
            type: UserActionTypes.SIGN_UP,
            payload: {
                loggedIn: true,
                id: response.data.data.id,
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


// FIXME change Promise<any> to more restricted type
export const login = (params: LoginParams): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const response = await axios({
            method: "post",
            baseURL: "https://expense-tracker-test-api.herokuapp.com/",
            url: "/auth/sign_in",
            params: params,
        })

        dispatch({
            type: UserActionTypes.LOGIN,
            payload: {
                loggedIn: true,
                id: response.data.data.id,
                authHeaders: {
                    client: response.headers["client"],
                    expiry: response.headers["expiry"],
                    uid: response.headers["uid"],
                    "access-token": response.headers["access-token"],
                    "token-type": response.headers["token-type"],
                }
            }
        })
        return Promise.resolve("a fancy message")
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
            console.log('Error', error.message);
        }
    }
}