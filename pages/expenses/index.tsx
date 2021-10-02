import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from '../../styles/Home.module.css';
import { RootState } from '../../redux/store';
import withAuth from '../../components/app/shared/withAuthentication';
import {
    updateAllExpensesAction,
    updateOneExpenseAction,
} from '../../redux/expenses/action';
import { getExpensesCall } from '../../api/expense/call';
import { getTagsCall } from '../../api/tag/call';
import { fetchTagsAction } from '../../redux/tags/action';
import { createExpenseAction } from '../../redux/expenses/action';
import ExpenseView from '../../components/app/expenses/expenseView';
import ExpenseActionPanel from '../../components/app/expenses/expenseActionPanel';
import { Expense } from '../../redux/expenses/types';
import AppLayout from '../../components/app/shared/appLayout';
import { AppNavPage } from '../../components/app/shared/nav/utils';

// ===================================================================
//                            Component
// ===================================================================
const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});

const dispatchToProps = {
    createExpenseAction,
    updateAllExpensesAction,
    updateOneExpenseAction,
    fetchTagsAction,
};

const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export type ExpensesProps = ReduxProps;

/**
 * Expense Index Page. Displays all expenses. Has links to create and edit expenses.
 *
 * @param {ExpensesProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function Expenses(props: ExpensesProps) {
    const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(
        undefined,
    );

    useEffect(() => {
        getTagsCall({
            headers: props.user.authHeaders,
        }).then(
            (data) => props.fetchTagsAction(data),
            (error) => console.log(error),
        );
    }, []); // Pass an empty array so it only fires once
    useEffect(() => {
        getExpensesCall({
            user_id: props.user.id,
            headers: props.user.authHeaders,
        }).then(
            (data) => props.updateAllExpensesAction(data),
            (error) => console.log(error),
        );
    }, []); // Empty array so only fires once

    return (
        <AppLayout page={AppNavPage.EXPENSES}>
            <main>
                <h1 className={styles.title}>Expenses!</h1>
                <ExpenseView
                    expenses={props.expense.expenses}
                    onSelect={setSelectedExpense}
                />
                <ExpenseActionPanel
                    selectedExpense={selectedExpense}
                    {...props}
                />
            </main>
        </AppLayout>
    );
}

export default connector(withAuth(Expenses));
