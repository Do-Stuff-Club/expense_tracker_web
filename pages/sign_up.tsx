// ===================================================================
//                             Imports
// ===================================================================
import { useRouter } from 'next/router';

import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FormButton from '../components/formButton';

import TestComponent from '../components/test';
import PageLayout from '../components/pageLayout';
import { newUserCall } from '../api/user/call';
import { NewUserParams } from '../api/user/types';
import { loginAction } from '../redux/user/action';

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
    const [state, setState] = useState<NewUserParams>({
        email: '',
        password: '',
        password_confirmation: '',
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
        newUserCall(state).then(
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
        <PageLayout pageName='Sign Up'>
            <div className={styles.outerContainer}>
                <div className={styles.formText}>
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Email</p>
                            </div>
                            <input
                                type='text'
                                onChange={(e) => handleChange('email', e)}
                            />
                        </div>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Password</p>
                            </div>
                            <input
                                type='text'
                                onChange={(e) => handleChange('password', e)}
                            />
                        </div>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Password Confirmation</p>
                            </div>
                            <input
                                type='text'
                                onChange={(e) =>
                                    handleChange('password_confirmation', e)
                                }
                            />
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
