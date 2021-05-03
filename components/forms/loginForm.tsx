// ===================================================================
//                             Imports
// ===================================================================
import { useFormik } from 'formik';
import React from 'react';
import styles from 'Form.module.css';
import textFieldStyles from '../styles/TextField.module.css';
import { FormProps } from './utils';
import FormButton from '../formButton';

// ===================================================================
//                         Helper Functions
// ===================================================================
type LoginFormState = {
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
    const formik = useFormik({
        initialValues: props.initialState,
        validate,
        onSubmit: props.onSubmit,
    });
    return (
        <div className={styles.outerContainer}>
            <div className={styles.formText}>
                <h1>Log In</h1>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <div className={textFieldStyles.textField}>
                        <div>
                            <p>Email</p>
                        </div>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        ></input>
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.formErrors}>
                            {formik.errors.email}
                        </div>
                    ) : null}
                    <div className={textFieldStyles.textField}>
                        <div>
                            <p>Password</p>
                        </div>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        ></input>
                    </div>
                    <div className={styles.formButtonContainer}>
                        <FormButton href='/' name='Home' />
                    </div>
                    <div className={styles.formButtonContainer}>
                        <FormButton type='submit' name='Log In' />
                    </div>
                </form>
            </div>
        </div>
    );
}
