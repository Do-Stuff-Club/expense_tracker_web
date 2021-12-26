// ===================================================================
//                             Constants
// ===================================================================
const storageKey = 'exp-trk';
const authStorageKey = `${storageKey}-auth`;
const userIdStorageKey = `${storageKey}-user-id`;

// ===================================================================
//                               Types
// ===================================================================
export type AuthHeaders = {
    client: string | null;
    expiry: string | null;
    uid: string | null;
    'access-token': string | null;
    'token-type': string | null;
};

// ===================================================================
//                             Functions
// ===================================================================
/**
 * Stores a user id in local storage. Usually used to store the id of the
 * current logged-in user during API calls.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API for
 * more info about local storage
 *
 * @param {string} id - user id
 */
export const storeUserId = (id: string): void => {
    if (window && localStorage) localStorage.setItem(userIdStorageKey, id);
};

/**
 * Retrieves logged-in user id from local storage, if it exists.
 *
 * @returns {string | undefined} - id of the current logged-in user, or undefined
 * if the user's id cannot be found in local storage.
 */
export const getUserId = (): string | undefined => {
    if (window && localStorage) {
        const userId = localStorage.getItem(userIdStorageKey);
        return userId || undefined;
    }
    return undefined;
};

/**
 * Checks if user is authenticated using information in local storage.
 *
 * @returns {boolean} - true if user is authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
    const authInfo = getAuthInfo();
    if (authInfo) {
        if (authInfo['access-token'])
            // sanity check
            return true;
    }

    return false;
};

/**
 * Persists authentication info to local storage.
 *
 * @param {AuthHeaders} authInfo - Authentication info to store.
 */
export const storeAuthInfo = (authInfo: AuthHeaders): void => {
    if (authInfo) {
        if (localStorage)
            localStorage.setItem(authStorageKey, JSON.stringify(authInfo));
        else throw Error('Local storage is not accessible');
    }
};

/**
 * Look up authentication info from local storage.
 *
 * @returns {AuthHeaders | undefined} - Authentication info from
 * local storage if it exists, undefined otherwise.
 */
export const getAuthInfo = (): AuthHeaders | undefined => {
    if (localStorage) {
        const authInfoStr = localStorage.getItem(authStorageKey);
        if (authInfoStr) {
            return JSON.parse(authInfoStr) as AuthHeaders;
        }
    }
    return undefined;
};

/**
 * Clears all authentication info from local storage.
 */
export const clearAuthInfo = (): void => {
    if (localStorage) {
        localStorage.removeItem(authStorageKey);
    }
};
