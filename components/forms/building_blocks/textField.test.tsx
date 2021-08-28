// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import TextField from './textField';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik } from 'formik';

// ===================================================================
//                              Tests
// ===================================================================

describe('TextField component', () => {
    it('renders its label', () => {
        render(
            <Formik
                initialValues={{
                    myField: '',
                }}
                onSubmit={() => {
                    return;
                }}
            >
                <TextField name='myField' label='Hello' />
            </Formik>,
        );
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('has a text field associated with the label', () => {
        render(
            <Formik
                initialValues={{
                    myField: '',
                }}
                onSubmit={() => {
                    return;
                }}
            >
                <TextField name='myField' label='Hello' />
            </Formik>,
        );
        expect(screen.getByLabelText('Hello')).toBeInTheDocument();

        userEvent.type(screen.getByLabelText('Hello'), 'My Input');

        expect(screen.getByLabelText('Hello')).toHaveValue('My Input');
    });

    it('displays validation errors after the user has visited the text field', async () => {
        render(
            <Formik
                initialValues={{
                    myField: '',
                }}
                onSubmit={() => {
                    return;
                }}
                validate={(values) => {
                    if (values.myField === '')
                        return { myField: 'Must not be empty' };
                    else return {};
                }}
            >
                <TextField name='myField' label='Hello' />
            </Formik>,
        );

        // Error doesn't appear until we visit the text field
        expect(screen.queryByText('Must not be empty')).not.toBeInTheDocument();

        // Visit the text field
        fireEvent.blur(screen.getByLabelText('Hello'));

        // Expect error to pop up
        await waitFor(() => {
            expect(screen.getByText('Must not be empty')).toBeInTheDocument();
        });

        // Type a valid string
        userEvent.type(screen.getByLabelText('Hello'), 'Valid string');

        // Expect error to disappear
        await waitFor(() => {
            expect(
                screen.queryByText('Must not be empty'),
            ).not.toBeInTheDocument();
        });
    });
});
