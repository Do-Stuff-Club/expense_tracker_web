// ===================================================================
//                             Imports
// ===================================================================
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

// ===================================================================
//                            Component
// ===================================================================
type NewTagDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (name: string) => void; // FIXME return error messages
};

/**
 * React component for searching through tags. Users can search, and a dropdown will show possible tag matches. A user selects a single tag out of these, which is then passed to a provided handler for further processing
 *
 * FIXME this module looks kinda ugly tbh
 *
 * @param {NewTagDialogProps} props - React properties for NewTagDialog
 * @returns {Element} a search bar that lets you select a single tag
 */
export default function NewTagDialog(props: NewTagDialogProps): JSX.Element {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>Create Tag</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name cannot be empty'),
                    })}
                    onSubmit={(values) => {
                        props.handleSubmit(values.name);
                        props.handleClose();
                    }}
                >
                    <Form>
                        <label htmlFor='name'>Name</label>
                        <Field name='name' id='name' type='text' />
                        <ErrorMessage name='name' />

                        <button type='submit'>Submit</button>
                    </Form>
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color='primary'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
