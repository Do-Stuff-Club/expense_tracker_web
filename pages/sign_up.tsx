// ===================================================================
//                             Imports
// ===================================================================
import { useRouter } from 'next/router';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FormButton from '../components/formButton';

import TestComponent from '../components/test';
import PageLayout from '../components/pageLayout';
import { newUserCall } from '../api/user/call';
import { loginAction } from '../redux/user/action';

import { useFormik } from 'formik';
import styles from '../styles/Form.module.css';
import textFieldStyles from '../styles/TextField.module.css';

// ===================================================================
//                            Component
// ===================================================================

const connector = connect(null, {
    loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type SignUpProps = ReduxProps;

export function SignUp(props: SignUpProps) {
    const validate = (values) => {
        const errors = {};

        if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (values.password != values.password_confirmation) {
            errors.password_confirmation = "Passwords don't match";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: '',
        },
        validate,
        onSubmit: (values) => {
            newUserCall(values).then(
                (data) => {
                    props.loginAction(data);
                    router.push('/dashboard');
                },
                (error) => {
                    console.log(error);
                },
            );

            //event.preventDefault();
        },
    });

    const router = useRouter();

    return (
        <PageLayout pageName='Sign Up'>
            <div className={styles.outerContainer}>
                <div className={styles.formText}>
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.formContainer}>
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
                            />
                        </div>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Password</p>
                            </div>
                            <input
                                id='password'
                                name='password'
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Password Confirmation</p>
                            </div>
                            <input
                                id='password_confirmation'
                                name='password_confirmation'
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password_confirmation}
                            />
                            {formik.errors.password_confirmation ? (
                                <div>{formik.errors.password_confirmation}</div>
                            ) : null}
                        </div>
                        <div className={styles.formButtonContainer}>
                            <FormButton href='/' name='Home' />
                        </div>
                        <div className={styles.formButtonContainer}>
                            <FormButton type='submit' name='Sign Up' />
                        </div>
                    </div>
                </form>
            </div>
            <TestComponent></TestComponent>
        </PageLayout>
    );
}

export default connector(SignUp);
