// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import styles from './Form.module.css';
import { FormProps } from './utils';
import FormButton from '../formButton';
import TextField from './TextField';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type LoginFormState = {
    email: string;
    password: string;
};

type LoginFormErrors = {
    email?: string;
    password?: string;
};

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
 * and password.
 *
 * @param {LoginFormProps} props - for the component
 * @returns {Element} LoginForm element
 */
export default function LoginForm(props: LoginFormProps): JSX.Element {
    return (
        <Formik
            initialValues={props.initialState}
            validate={validate}
            onSubmit={props.onSubmit}
        >
            <div className={styles.outerContainer}>
                <div className={styles.formText}>
                    <h1>Log In</h1>
                </div>
                <Form noValidate className={styles.formContainer}>
                    <TextField name='email' label='Email' />
                    <TextField name='password' label='Password' />
                    <div
                        className={`${styles.formButtonContainer} ${styles.homeButton}`}
                    >
                        <FormButton href='/' name='Home' />
                    </div>
                    <div
                        className={`${styles.formButtonContainer} ${styles.submitButton}`}
                    >
                        <FormButton type='submit' name='Log In' />
                    </div>
                </Form>
            </div>
        </Formik>
    );
}