import { Button } from '@material-ui/core';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from '../../styles/Home.module.css';
import { RootState } from '../../redux/store';
import withAuth from '../../components/withAuthentication';
import PageLayout from '../../components/pageLayout';
import { updateAllExpensesAction } from '../../redux/expenses/action';
import { deleteExpenseCall, getExpensesCall } from '../../api/expense/call';
import NavBreadcrumbs from '../../components/navBreadcrumbs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ExpenseForm from '../../components/expenses/expenseForm';
import { getTagsCall } from '../../api/tag/call';
import { fetchTagsAction } from '../../redux/tags/action';

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
    updateAllExpensesAction,
    fetchTagsAction,
};

const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type ExpensesProps = ReduxProps;

/**
 * Expense Index Page. Displays all expenses. Has links to create and edit expenses.
 *
 * @param {ExpensesProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function Expenses(props: ExpensesProps) {
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

    const onDelete = (id: number) => {
        deleteExpenseCall({
            id: id,
            headers: props.user.authHeaders,
        }).then(
            (data) => props.updateAllExpensesAction(data),
            (error) => console.log(error),
        );
    };

    return (
        <PageLayout pageName='My Expenses'>
            Here be expenses
            <main>
                <NavBreadcrumbs></NavBreadcrumbs>
                <h1 className={styles.title}>Expenses!</h1>
                <Link href='/expense/new' passHref>
                    <Button variant='contained'>New Expense</Button>
                </Link>
                <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Expense</TableCell>
                                <TableCell align='right'>Date</TableCell>
                                <TableCell align='right'>Cost</TableCell>
                                <TableCell align='right'>Link</TableCell>
                                <TableCell align='left'>Tags</TableCell>
                                <TableCell align='right'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.expense.expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell component='th' scope='row'>
                                        {expense.name}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {JSON.stringify(expense.date)}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {JSON.stringify(expense.cost)}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {JSON.stringify(expense.link)}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {JSON.stringify(expense.tags)}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Link
                                            href={
                                                '/expense/' +
                                                expense.id +
                                                '/edit'
                                            }
                                            passHref
                                        >
                                            <IconButton aria-label='Edit'>
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            aria-label='Delete'
                                            onClick={() => onDelete(expense.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ExpenseForm
                    tagState={props.tag}
                    initialState={{
                        name: '',
                        price: 0,
                        date: new Date(),
                        link: '',
                        tags: [],
                    }}
                    onSubmit={() => {
                        return;
                    }}
                ></ExpenseForm>
            </main>
        </PageLayout>
    );
}

export default connector(withAuth(Expenses));
