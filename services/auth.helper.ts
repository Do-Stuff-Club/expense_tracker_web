import { AuthHeaders } from '../redux/user/types';

const storageKey = 'exp-trk';

const authStorageKey = `${storageKey}-auth`;
/**
 * Persists auth info
 * @param authInfo Auth information
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
 * @returns Auth information
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
