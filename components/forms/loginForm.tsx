// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import styles from './Form.module.css';
import { FormProps } from './utils';
import FormButton from './building_blocks/formButton';
import TextField from './building_blocks/textField';

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
            <Form noValidate className={styles.formContainer}>
                <TextField
                    name='email'
                    label='Email'
                    className={styles.textField}
                />
                <TextField
                    name='password'
                    label='Password'
                    type='password'
                    className={styles.textField}
                />
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
        </Formik>
    );
}
