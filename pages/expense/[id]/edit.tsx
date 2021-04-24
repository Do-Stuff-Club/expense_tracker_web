import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import {
    updateOneExpenseAction,
    updateAllExpensesAction,
} from '../../../redux/expenses/action';
import { RootState } from '../../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import PageLayout from '../../../components/pageLayout';
import { Button, Card, Grid, List, Switch, TextField } from '@material-ui/core';
import withAuth from '../../../components/withAuthentication';

// Date Picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});
const connector = connect(stateToProps, {
    updateOneExpenseAction,
    updateAllExpensesAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type EditExpenseProps = ReduxProps;

function EditExpense(props: EditExpenseProps) {
    const [, setExpenseName] = useState<string>('');
    const [, setExpenseCost] = useState<number>(0.0);
    const [expenseDate, setExpenseDate] = useState<string>('');
    const [, setExpenseLink] = useState<string>('');
    const router = useRouter();

    const { id } = router.query; //FIXME set type for router query
    console.log(props);
    const expense = props.expense.expenses.find(
        // @ts-expect-error FIXME - router query type doesn't work as I want it to, temporarily ignore types
        (expense) => expense.id == parseInt(id),
    );

    const handleIdError = () => {
        return;
    };

    if (expense == null) {
        handleIdError();
        return <></>; // FIXME
    } else {
        const [selectedDate, setSelectedDate] = useState<Date | null>(
            new Date(expense.date),
        );
        const handleChangeExpenseName = (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            const target = event.target;
            setExpenseName(target.value.trim());
        };

        const handleChangeExpenseCost = (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            const target = event.target;
            setExpenseCost(Number(target.value.trim()));
        };

        // TODO: date validation
        const handleChangeDate = (date: Date | null) => {
            setSelectedDate(date);
            const newDateString =
                selectedDate == null
                    ? // selectedDate should never be null here b/c it's required during expense creation
                      expense.date
                    : `${
                          selectedDate.getMonth() + 1
                      }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
            setExpenseDate(newDateString);
        };

        const handleChangeExpenseLink = (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            const target = event.target;
            setExpenseLink(target.value.trim());
        };
        return (
            <PageLayout pageName='Edit Expense'>
                <Card>
                    <Grid
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                    >
                        <Grid>
                            <TextField
                                label='Expense Name'
                                onChange={handleChangeExpenseName}
                                defaultValue={expense.name}
                            ></TextField>
                            <TextField
                                label='Cost'
                                onChange={handleChangeExpenseCost}
                                defaultValue={expense.cost}
                            ></TextField>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='MM/dd/yyyy'
                                    margin='normal'
                                    id='date-picker-inline'
                                    label='Select purchase date'
                                    value={expenseDate}
                                    defaultValue={expense.date}
                                    onChange={handleChangeDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                label='Link'
                                onChange={handleChangeExpenseLink}
                                defaultValue={expense.link}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Card>
            </PageLayout>
        );
    }
}

export default connector(withAuth(EditExpense));
