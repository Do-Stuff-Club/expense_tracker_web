// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import { FormProps } from './utils';
import FormButton from '../inputs/formButton';
import TextField from '../inputs/textField';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type LoginFormState = {
    email: string;
    password: string;
};

type LoginFormErrors = Partial<LoginFormState>;

/**
 * Helper function that analyzes the form's current state and returns a
 * formik errors object
 *
 * @param {LoginFormState} values - form's current state
 * @returns {LoginFormErrors} formik error object
 */
function validate(values: LoginFormState): LoginFormErrors {
    const errors: LoginFormErrors = {};

    if (!values.email.includes('@')) {
        errors.email = 'Not a valid email address';
    }

    return errors;
}
// ===================================================================
//                            Component
// ===================================================================
type LoginFormProps = FormProps<LoginFormState>;

/**
 * Login Form for use on the login page. Users login using their email
 * and password. This is the outer <form/>
 * component that also provides the Formik context.
 *
 * @param {LoginFormProps} props - for the component
 * @returns {Element} LoginForm element
 */
export function LoginForm(props: LoginFormProps): JSX.Element {
    return (
        <Formik
            initialValues={props.initialState}
            validate={validate}
            onSubmit={props.onSubmit}
        >
            <Form noValidate>{props.children}</Form>
        </Formik>
    );
}

/**
 * Login Form inputs, including text fields, date pickers, tag selectors, etc.
 * MUST be used as a child of a <LoginForm /> component.
 * It can be an indirect child of an LoginForm.
 *
 * @returns {Element} LoginFormInputs element
 */
export function LoginFormInputs(): JSX.Element {
    return (
        <>
            <TextField name='email' label='Email' />
            <TextField name='password' label='Password' type='password' />
        </>
    );
}

/**
 * Login Form action buttons, including submit and cancel.
 * MUST be used as a child of a <LoginForm /> component.
 * It can be an indirect child of an LoginForm.
 *
 * @returns {Element} LoginFormActions element
 */
export function LoginFormActions(): JSX.Element {
    return (
        <>
            <FormButton name='Back' href='/' />
            <FormButton type='submit' name='Log In' />
        </>
    );
}
