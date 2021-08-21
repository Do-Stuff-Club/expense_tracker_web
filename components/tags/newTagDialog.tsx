// ===================================================================
//                             Imports
// ===================================================================
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

// ===================================================================
//                            Component
// ===================================================================
type NewTagDialogProps = {
    onSubmit: (name: string) => void;
};

/**
 * React component for searching through tags. Users can search, and a dropdown will show possible tag matches. A user selects a single tag out of these, which is then passed to a provided handler for further processing
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {NewTagDialogProps} props - React properties for NewTagDialog
 * @returns {Element} a search bar that lets you select a single tag
 */
export default function NewTagDialog(props: NewTagDialogProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    //const [tagName, setTagName] = useState<string>('');

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                </DialogContentText>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name cannot be empty'),
                    })}
                    onSubmit={(values) => {
                        props.onSubmit(values.name);
                    }}
                >
                    <Form>
                        <label htmlFor='name'>Name</label>
                        <Field name='name' type='text' />
                        <ErrorMessage name='name' />

                        <button type='submit'>Submit</button>
                    </Form>
                </Formik>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Email Address'
                    type='email'
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={handleClose} color='primary'>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
