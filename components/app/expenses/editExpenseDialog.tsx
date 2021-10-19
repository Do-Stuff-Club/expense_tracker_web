// ===================================================================
//                             Imports
// ===================================================================
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import React from 'react';
import { Expense } from '../../../redux/expenses/types';
import { TagState } from '../../../redux/tags/types';
import {
    ExpenseForm,
    ExpenseFormActions,
    ExpenseFormInputs,
    ExpenseFormState,
} from './expenseForm';

// ===================================================================
//                            Component
// ===================================================================
type EditExpenseDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (formState: ExpenseFormState) => void; // FIXME return error messages
    tagState: TagState;
    expense: Expense;
};

/**
 * React component for editing expenses
 *
 * FIXME this module looks kinda ugly tbh
 *
 * @param {EditExpenseDialogProps} props - React properties for EditExpenseDialog
 * @returns {Element} a search bar that lets you select a single tag
 */
export default function EditExpenseDialog(
    props: EditExpenseDialogProps,
): JSX.Element {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>Edit Expense</DialogTitle>
            <ExpenseForm
                initialState={{
                    name: props.expense.name,
                    price: props.expense.cost,
                    date: new Date(props.expense.date),
                    link: props.expense.link,
                    tags: props.expense.tags,
                }}
                onSubmit={(formState) => {
                    console.log('Submit!!');
                    props.handleSubmit(formState);
                    props.handleClose();
                }}
            >
                <DialogContent>
                    <ExpenseFormInputs />
                </DialogContent>
                <DialogActions>
                    <ExpenseFormActions onCancel={props.handleClose} />
                </DialogActions>
            </ExpenseForm>
        </Dialog>
    );
}
