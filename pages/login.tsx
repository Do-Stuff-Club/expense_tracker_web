// ===================================================================
//                             Imports
// ===================================================================
import { useRouter } from 'next/router';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { loginAction } from '../redux/user/action';
import TestComponent from '../components/debug';
import PageLayout from '../components/pageLayout';
import { loginCall } from '../api/user/call';
import {
    LoginForm,
    LoginFormInputs,
    LoginFormActions,
    LoginFormState,
} from '../components/app/shared/forms/loginForm';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';

// ===================================================================
//                            Component
// ===================================================================

const connector = connect(null, {
    loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type LoginProps = ReduxProps;

/**
 * Login page component. Contains a form for logging in.
 *
 * @param {LoginProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function Login(props: LoginProps) {
    const initialState = {
        email: '',
        password: '',
    };

    const onSubmit = (values: LoginFormState) => {
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
        <PageLayout pageName='Expense Tracker Login' center={true}>
            <Card sx={{ maxWidth: 275 }}>
                <CardHeader title='Log In' />
                <LoginForm initialState={initialState} onSubmit={onSubmit}>
                    <CardContent>
                        <LoginFormInputs />
                    </CardContent>
                    <CardActions>
                        <LoginFormActions />
                    </CardActions>
                </LoginForm>
            </Card>
            <TestComponent></TestComponent>
        </PageLayout>
    );
}

export default connector(Login);
