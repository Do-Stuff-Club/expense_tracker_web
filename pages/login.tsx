// ===================================================================
//                             Imports
// ===================================================================
import Head from 'next/head';
import { useRouter } from 'next/router';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FormButton from '../components/formButton';

import { loginAction } from '../redux/user/action';
import TestComponent from '../components/debug';
import PageLayout from '../components/pageLayout';
import { loginCall } from '../api/user/call';
import { Formik, useFormik } from 'formik';
import LoginForm, { LoginFormState } from '../components/forms/loginForm';

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

    const initialState = {
        email: '',
        password: '',
    };

    const onSubmit = (values: LoginFormState) => {
        console.log('onSubmit!');
        loginCall(values).then(
            (data) => {
                props.loginAction(data);
                router.push('/dashboard');
            },
            (error) => {
                console.log(error);
            },
        );
    };

    const router = useRouter();

    return (
        <PageLayout pageName='Expense Tracker Login'>
            <Head>
                <title>Create Next App</title>
            </Head>
            <LoginForm initialState={initialState} onSubmit={onSubmit} />
            <TestComponent></TestComponent>
        </PageLayout>
    );
}

export default connector(Login);
