const storageKey = 'exp-trk';
const authStorageKey = `${storageKey}-auth`;
const userIdStorageKey = `${storageKey}-user-id`;

export type AuthHeaders = {
    client: string;
    expiry: string;
    uid: string;
    'access-token': string;
    'token-type': string;
};

/**
 * Stores logged in user id
 *
 * @param {string} id user id
 */
export const storeUserId = (id: string): void => {
    if (window && localStorage) localStorage.setItem(userIdStorageKey, id);
};

/**
 * Retrieves logged in user id from the storage
 *
 * @returns {string} logged in user id
 */
export const getUserId = (): string | undefined => {
    if (window && localStorage) {
        const userId = localStorage.getItem(userIdStorageKey);
        return userId || undefined;
    }
    return undefined;
};

/**
 * Checks if user is authenticated
 *
 * @returns {boolean} true if user is authenticated, false otherwise
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
 * Persists auth info
 *
 * @param {AuthHeaders} authInfo Auth information
 */
export const storeAuthInfo = (authInfo: AuthHeaders): void => {
    if (authInfo) {
        if (localStorage)
            localStorage.setItem(authStorageKey, JSON.stringify(authInfo));
        else throw Error('Local storage is not accessible');
    }
};

/**
 * Returns stored auth info
 *
 * @returns {AuthHeaders | undefined} Auth information
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
 * Clears auth info from the storage
 */
export const clearAuthInfo = (): void => {
    if (localStorage) {
        localStorage.removeItem(authStorageKey);
    }
};
