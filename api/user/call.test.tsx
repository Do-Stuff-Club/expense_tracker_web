// ===================================================================
//                             Imports
// ===================================================================
import { LoginParams, NewUserParams, UserData } from './types';
import axios from 'axios';
import { loginCall, newUserCall } from './call';

// ===================================================================
//                           Test Setup
// ===================================================================
jest.mock('axios', () => jest.fn());
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

// ===================================================================
//                              Tests
// ===================================================================
describe('newUserCall()', () => {
    it('successfully creates a user', async () => {
        const testParams: NewUserParams = {
            email: 'test@domain.com',
            password: 'super_secret',
            password_confirmation: 'super_secret',
        };

        // See documentation generated here: https://github.com/kwf37/expense_tracker_api
        const mockApiResponse = {
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'access-token': '-MW9nVhXviMt83nlYQU9yw',
                'token-type': 'Bearer',
                client: 'VZ6QbHPUroBvLnVcKQGYkw',
                expiry: '1618718924',
                uid: 'test@test.org',
            },
            data: {
                status: 'success',
                data: {
                    uid: 'test@domain.com',
                    id: 1,
                    email: 'test@domain.com',
                    provider: 'email',
                    allow_password_change: false,
                    created_at: '2021-04-04T04:08:44.671Z',
                    updated_at: '2021-04-04T04:08:44.680Z',
                },
            },
        };

        const expectedData: UserData = {
            id: 1,
        };

        mockedAxios.mockResolvedValueOnce(mockApiResponse);

        await expect(newUserCall(testParams)).resolves.toEqual(expectedData);
    });

    it('returns an error on non-200 messages', async () => {
        const testParams: NewUserParams = {
            email: 'test@domain.com',
            password: 'super_secret',
            password_confirmation: 'super_secret',
        };

        // See documentation generated here: https://github.com/kwf37/expense_tracker_api
        const mockApiResponse = {
            status: 401,
            statusText: 'Bad Request',
            config: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                response: 'error',
            },
        };

        mockedAxios.mockRejectedValueOnce(mockApiResponse);

        await expect(newUserCall(testParams)).rejects.toEqual(mockApiResponse);
    });
});

describe('loginCall()', () => {
    it('successfully returns user data', async () => {
        const testParams: LoginParams = {
            email: 'test@domain.com',
            password: 'super_secret',
        };

        // See documentation generated here: https://github.com/kwf37/expense_tracker_api
        const mockApiResponse = {
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'access-token': '-MW9nVhXviMt83nlYQU9yw',
                'token-type': 'Bearer',
                client: 'VZ6QbHPUroBvLnVcKQGYkw',
                expiry: '1618718924',
                uid: 'test@test.org',
            },
            data: {
                status: 'success',
                data: {
                    uid: 'test@domain.com',
                    id: 1,
                    email: 'test@domain.com',
                    provider: 'email',
                    allow_password_change: false,
                    created_at: '2021-04-04T04:08:44.671Z',
                    updated_at: '2021-04-04T04:08:44.680Z',
                },
            },
        };

        const expectedData: UserData = {
            id: 1,
        };

        mockedAxios.mockResolvedValueOnce(mockApiResponse);

        await expect(loginCall(testParams)).resolves.toEqual(expectedData);
    });

    it('returns an error on non-200 messages', async () => {
        const testParams: LoginParams = {
            email: 'test@domain.com',
            password: 'super_secret',
        };

        // See documentation generated here: https://github.com/kwf37/expense_tracker_api
        const mockApiResponse = {
            status: 401,
            statusText: 'Bad Request',
            config: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                response: 'error',
            },
        };

        mockedAxios.mockRejectedValueOnce(mockApiResponse);

        await expect(loginCall(testParams)).rejects.toEqual(mockApiResponse);
    });
});
