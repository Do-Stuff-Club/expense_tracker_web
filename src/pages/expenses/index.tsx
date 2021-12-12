import React from 'react';
import AppLayout from '../../components/app/shared/layout/appLayout';
import { AppNavPage } from '../../components/app/shared/nav/utils';
import Expenses from '../../containers/expenses.container';

// ===================================================================
//                            Component
// ===================================================================
/**
 * Expense Index Page. Displays all expenses. Has links to create and edit expenses.
 *
 * @returns {Element} Page element
 */
const ExpensesPage = (): JSX.Element => (
    <AppLayout page={AppNavPage.EXPENSES}>
        <Expenses />
    </AppLayout>
);

export default ExpensesPage;
