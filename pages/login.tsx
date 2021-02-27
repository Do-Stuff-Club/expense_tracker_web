// ===================================================================
//                             Imports
// ===================================================================
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FormButton from '../components/formButton';

import { loginAction } from '../redux/user/action';
import TestComponent from '../components/test';
import { Router } from '@material-ui/icons';
import withAuthentication from '../components/withAuthentication';
import PageLayout from '../components/pageLayout';
import { LoginParams } from '../api/user/types';
import { loginCall } from '../api/user/call';
import styles from '../styles/Login.module.css';
import textFieldStyles from '../styles/TextField.module.css';

// ===================================================================
//                            Component
// ===================================================================

const connector = connect(null, {
    loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type LoginProps = ReduxProps;

function Login(props: LoginProps) {
    const [state, setState] = useState<LoginParams>({
        email: '',
        password: '',
    });
    const router = useRouter();

    const handleChange = (
        name: string,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target;
        setState({
            ...state,
            [name]: target.value,
        });
    };

    const handleSubmit = (event: SyntheticEvent) => {
        loginCall(state).then(
            (data) => {
                props.loginAction(data);
                router.push('/dashboard');
            },
            (error) => {
                console.log(error);
            },
        );
        event.preventDefault();
    };

    return (
        <PageLayout pageName='Expense Tracker Login'>
            <Head>
                <title>Create Next App</title>
            </Head>
            <div className={styles.outerContainer}>
                <div className={styles.loginText}>
                    <h1>Log in</h1>
                </div>
                <div className={styles.loginContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Email</p>
                            </div>
                            <input
                                type='text'
                                onChange={(e) => handleChange('email', e)}
                            ></input>
                        </div>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Password</p>
                            </div>
                            <input
                                type='text'
                                onChange={(e) => handleChange('password', e)}
                            ></input>
                        </div>
                        <div className={styles.loginButtonContainer}>
                            <FormButton href='/' name='Home' />
                        </div>
                        <div className={styles.loginButtonContainer}>
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
