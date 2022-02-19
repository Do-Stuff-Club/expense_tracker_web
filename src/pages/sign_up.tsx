// ===================================================================
//                             Imports
// ===================================================================
import { useRouter } from 'next/router';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import TestComponent from '../components/misc/debug';
import PageLayout from '../components/layout/pageLayout';
import { signUpAction } from '../redux/user/action';

import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import {
    SignUpForm,
    SignUpFormInputs,
    SignUpFormActions,
    SignUpFormState,
} from '../formik/forms/signUpForm';

// ===================================================================
//                            Component
// ===================================================================

const connector = connect(null, {
    signUpAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type SignUpProps = ReduxProps;

/**
 * Sign up page component. Contans a form for registering new users.
 *
 * @param {SignUpProps} props - Props from Redux state
 * @returns {Element} Page element
 */
export function SignUp(props: SignUpProps): JSX.Element {
    const router = useRouter();

    const initialState = {
        email: '',
        password: '',
        password_confirmation: '',
    };

    const onSubmit = (values: SignUpFormState) => {
        props.signUpAction(values).then(() => router.push('/login'));
    };

    return (
        <PageLayout pageName='Expense Tracker Login' center={true}>
            <Card sx={{ maxWidth: 275 }}>
                <CardHeader title='Log In' />
                <SignUpForm initialState={initialState} onSubmit={onSubmit}>
                    <CardContent>
                        <SignUpFormInputs />
                    </CardContent>
                    <CardActions>
                        <SignUpFormActions />
                    </CardActions>
                </SignUpForm>
            </Card>
            <TestComponent></TestComponent>
        </PageLayout>
    );
}

export default connector(SignUp);
