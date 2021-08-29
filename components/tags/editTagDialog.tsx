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
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from 'react';
import * as Yup from 'yup';

// ===================================================================
//                            Component
// ===================================================================
type EditTagDialogProps = {
    open: boolean;
    name: string;
    handleClose: () => void;
    handleSubmit: (name: string) => void; //FIXME return error messages
}

/**
 * React component for editing an existing tag. 
 * 
 * @param {EditTagDialogProps} props - React properties for EditTagDialog
 * @returns {Element} a dialog box that lets you edit a single tag
 */
export default function EditTagDialog(props: EditTagDialogProps): JSX.Element {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby='form--dialog-title'
        >
            <DialogTitle id='form-dialog-title'>Edit Tag</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{ name: props.name}}
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
                        <Field name='name' type='text' />
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
    )
}