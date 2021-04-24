// ===================================================================
//                             Imports
// ===================================================================
import Head from 'next/head';
import { useRouter } from 'next/router';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FormButton from '../components/formButton';

import { loginAction } from '../redux/user/action';
import TestComponent from '../components/test';
import PageLayout from '../components/pageLayout';
import { loginCall } from '../api/user/call';
import styles from '../styles/Form.module.css';
import textFieldStyles from '../styles/TextField.module.css';
import { useFormik } from 'formik';

// ===================================================================
//                            Component
// ===================================================================

const connector = connect(null, {
    loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type LoginProps = ReduxProps;

type FormikState = {
    email: string;
    password: string;
};

/**
 * Login page component. Contains a form for logging in.
 *
 * @param {LoginProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function Login(props: LoginProps) {
    const validate = (values: FormikState) => {
        const errors: {
            email?: string;
            password?: string;
        } = {};

        if (!values.email.includes('@')) {
            errors.email = 'Not a valid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            loginCall(values).then(
                (data) => {
                    props.loginAction(data);
                    router.push('/dashboard');
                },
                (error) => {
                    console.log(error);
                },
            );
        },
    });

    const router = useRouter();

    return (
        <PageLayout pageName='Expense Tracker Login'>
            <Head>
                <title>Create Next App</title>
            </Head>
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
            <TestComponent></TestComponent>
        </PageLayout>
    );
}

export default connector(Login);
