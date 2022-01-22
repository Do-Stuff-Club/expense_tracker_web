// ===================================================================
//                             Imports
// ===================================================================
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Expense } from '../../../redux/expenses/types';

import ExpenseActionDrawer from '../../../containers/expenses/expenseActionDrawer.container';

import ExpenseView from './expenseView';

import { AllTagsData } from '../../../api/tag/types';
import { AllExpensesData } from '../../../api/expense/types';

// ===================================================================
//                             Component
// ===================================================================
type ExpensesProps = {
    getAllTagsAction: () => Promise<AllTagsData | undefined>;
    getExpensesAction: (
        userId: number | undefined,
    ) => Promise<AllExpensesData | undefined>;
    expenses: readonly Expense[];
    userId: number | undefined;
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
        const { getAllTagsAction, getExpensesAction, userId } = props;
        // get all tags
        getAllTagsAction();
        // get user's expenses
        getExpensesAction(userId);
    }, []); // Pass an empty array so it only fires once

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
