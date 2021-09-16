// ===================================================================
//                             Imports
// ===================================================================
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import React from 'react';
import { TagState } from '../../redux/tags/types';
import ExpenseForm, { ExpenseFormState } from './expenseForm';

// ===================================================================
//                            Component
// ===================================================================
type NewExpenseDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (formState: ExpenseFormState) => void; // FIXME return error messages
    tagState: TagState;
};

/**
 * React component for creating expenses
 *
 * FIXME this module looks kinda ugly tbh
 *
 * @param {NewExpenseDialogProps} props - React properties for NewExpenseDialog
 * @returns {Element} a search bar that lets you select a single tag
 */
export default function NewExpenseDialog(
    props: NewExpenseDialogProps,
): JSX.Element {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>Create Expense</DialogTitle>
            <DialogContent>
                <ExpenseForm
                    initialState={{
                        name: '',
                        price: 0,
                        date: new Date(),
                        link: '',
                        tags: [],
                    }}
                    onSubmit={(formState) => {
                        console.log('Submit!!');
                        props.handleSubmit(formState);
                        props.handleClose();
                    }}
                    tagState={props.tagState}
                ></ExpenseForm>
            </DialogContent>
        </Dialog>
    );
}
