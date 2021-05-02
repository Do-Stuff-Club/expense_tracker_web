// ===================================================================
//                             Imports
// ===================================================================
import { NewUserParams, UserData } from './types';
import axios from 'axios';
import { newUserCall } from './call';

// ===================================================================
//                              Tests
// ===================================================================
jest.mock('axios', () => jest.fn());
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

test('newUserCall() successfully creates a user', async () => {
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
            'access-token': '-MW9nVhXviMt83nlYQU9yw',
            'token-type': 'Bearer',
            client: 'VZ6QbHPUroBvLnVcKQGYkw',
            expiry: '1618718924',
            uid: 'test@test.org',
            'Content-Type': 'application/json; charset=utf-8',
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
        authHeaders: {
            'access-token': '-MW9nVhXviMt83nlYQU9yw',
            'token-type': 'Bearer',
            client: 'VZ6QbHPUroBvLnVcKQGYkw',
            expiry: '1618718924',
            uid: 'test@test.org',
        },
    };

    mockedAxios.mockResolvedValueOnce(mockApiResponse);

    await expect(newUserCall(testParams)).resolves.toEqual(expectedData);
});
