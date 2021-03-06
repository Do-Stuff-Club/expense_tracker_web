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
import { useFormik } from 'formik';

// ===================================================================
//                            Component
// ===================================================================

const connector = connect(null, {
    loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type LoginProps = ReduxProps;

function Login(props: LoginProps) {

    const formik = useFormik({
        initialValues: { 
            email: '',
            password: '',
        },
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
                
            //event.preventDefault();
        }
    });

    //TODO: add validation for pass
    //const validation
      
    const router = useRouter();

    return (
        <PageLayout pageName='Expense Tracker Login'>
            <Head>
                <title>Create Next App</title>
            </Head>
            <div className={styles.outerContainer}>
                <div className={styles.loginText}>
                    <h1>Log In</h1>
                </div>
                <div className={styles.loginContainer}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Email</p>
                            </div>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            ></input>
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
                                value={formik.values.password}
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
