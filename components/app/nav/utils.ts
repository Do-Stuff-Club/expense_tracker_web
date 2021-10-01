// ===================================================================
//                            Export Types
// ===================================================================
export enum AppNavPage {
    TAGS = 'TAGS_PAGE',
    EXPENSES = 'EXPENSES_PAGE',
    DASHBOARD = 'DASHBOARD_PAGE',
}

// ===================================================================
//                            Export Values
// ===================================================================
// Defines the order in which the pages should be listed in a nav component
export const pages = [
    AppNavPage.TAGS,
    AppNavPage.EXPENSES,
    AppNavPage.DASHBOARD,
];

/**
 * Maps AppNavPage to a string page title.
 *
 * @param {AppNavPage} page - the enum representing the page
 * @returns {string} the title of the page
 */
export function pageTitle(page: AppNavPage): string {
    if (page == AppNavPage.TAGS) return 'Tags';
    else if (page == AppNavPage.EXPENSES) return 'Expenses';
    else return 'Dashboard';
}

/**
 * Maps AppNavPage to a url.
 *
 * @param {AppNavPage} page - the enum representing the page
 * @returns {string} the link to the page
 */
export function pageLink(page: AppNavPage): string {
    if (page == AppNavPage.TAGS) return '/tags';
    else if (page == AppNavPage.EXPENSES) return '/expenses';
    else return '/dashboard';
}
