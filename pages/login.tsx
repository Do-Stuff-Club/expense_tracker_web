// ===================================================================
//                             Imports
// ===================================================================
import Head from 'next/head';
import { useRouter } from 'next/router';

import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FormButton from '../components/formButton';

import { loginAction } from '../redux/user/action';
import TestComponent from '../components/test';
import PageLayout from '../components/pageLayout';
import { LoginParams } from '../api/user/types';
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
        },
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
                <div className={styles.formText}>
                    <h1>Log In</h1>
                </div>
                <div className={styles.formContainer}>
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
