import { Button, Card, Grid, List, StylesProvider, Switch, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import styles from "../../styles/Home.module.css";
import { RootState } from "../../redux/store";
import withAuth from "../../components/withAuthentication";
import PageLayout from "../../components/pageLayout";
import { updateAllExpensesAction } from "../../redux/expenses/action";
import { deleteExpenseCall, getExpensesCall } from "../../api/expense/call";
import { deleteCategoryCall } from "../../api/tag/call";
import ExpenseView from "../../components/expenseView";

const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});

const dispatchToProps = {
    updateAllExpensesAction
};

const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type ExpensesProps = ReduxProps;

function Expenses(props: ExpensesProps) {
    const router = useRouter();
    
    useEffect(() => {
        getExpensesCall({
            user_id: props.user.id,
            headers: props.user.authHeaders,
        }).then(
            (data) => props.updateAllExpensesAction(data),
            (error) => console.log(error)
        )
    }, []); // Empty array so only fires once

    const onDelete = (id: number) => {
        deleteExpenseCall({
            id: id,
            headers: props.user.authHeaders,
        }).then(
            (data) => props.updateAllExpensesAction(data),
            (error) => console.log(error)
        )
    }

    return (
        <PageLayout pageName="My Expenses">
            Here be expenses
            <main>
                <h1 className={styles.title}>Expenses!</h1>
                <Link href="/expense/new" passHref>
                    <Button variant="contained">New Expense</Button>
                </Link>
                {props.expense.expenses.map((expense, i) => {
                    return (
                        <ExpenseView
                          listKey={i}
                          expense={expense}
                          onDelete={() => onDelete(expense.id)}
                        ></ExpenseView>
                    );
                })}
            </main>
        </PageLayout>
    );
}

export default connector(withAuth(Expenses));
