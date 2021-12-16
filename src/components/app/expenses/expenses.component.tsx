import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Expense } from '../../../redux/expenses/types';

// import ExpenseActionDrawer from './expenseActionDrawer';
import ExpenseActionDrawer from '../../../containers/expenses/expenseActionDrawer.container';
import ExpenseView from './expenseView';
import { AllExpensesData, OneExpenseData } from '../../../api/expense/types';
import { AllTagsData } from '../../../api/tag/types';

type ExpensesProps = {
    updateAllExpensesAction: (data: AllExpensesData) => Promise<void>;
    updateOneExpenseAction: (data: OneExpenseData) => Promise<void>;
    fetchTagsAction: (data: AllTagsData) => Promise<void>;
    expenses: readonly Expense[];
};

/**
 * Expense Index Page. Displays all expenses. Has links to create and edit expenses.
 *
 * @param {ExpensesProps} props - Props from Redux state
 * @returns {Element} Page element
 */
const Expenses = (props: ExpensesProps): JSX.Element => {
    const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(
        undefined,
    );

    useEffect(() => {
        // getTagsCall().then(
        //     (data) => props.fetchTagsAction(data),
        //     (error) => console.log(error),
        // );
    }, []); // Pass an empty array so it only fires once
    useEffect(() => {
        // getExpensesCall(props.user.id).then(
        //     (data) => {
        //         console.log('GetExpenseCall success');
        //         props.updateAllExpensesAction(data);
        //     },
        //     (error) => console.log(error),
        // );
    }, []); // Empty array so only fires once

    //TODO: create a new container for ExpenseActionDrawer
    const { expenses } = props;
    return (
        <>
            <ExpenseActionDrawer selectedExpense={selectedExpense} />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <ExpenseView
                    expenses={expenses}
                    onSelect={setSelectedExpense}
                />
            </Box>
        </>
    );
};

export default Expenses;
