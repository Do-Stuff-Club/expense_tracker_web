// ===================================================================
//                             Imports
// ===================================================================
import { useRouter } from 'next/router';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FormButton from '../components/app/shared/forms/building_blocks/formButton';

import TestComponent from '../components/debug';
import PageLayout from '../components/pageLayout';
import { newUserCall } from '../api/user/call';
import { loginAction } from '../redux/user/action';

import { useFormik } from 'formik';
import styles from '../components/forms/Form.module.css';
import textFieldStyles from '../components/forms/building_blocks/textField.module.css';

// ===================================================================
//                            Component
// ===================================================================

const connector = connect(null, {
    loginAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type SignUpProps = ReduxProps;

type FormikFields = {
    email: string;
    password: string;
    password_confirmation: string;
};

/**
 * Sign up page component. Contans a form for registering new users.
 *
 * @param {SignUpProps} props - Props from Redux state
 * @returns {Element} Page element
 */
export function SignUp(props: SignUpProps): JSX.Element {
    const validate = (values: FormikFields) => {
        const errors: {
            email?: string;
            password?: string;
            password_confirmation?: string;
        } = {};

        if (!values.email.includes('@')) {
            errors.email = 'Not a valid email address';
        }

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
        },
    });

    const router = useRouter();

    return (
        <PageLayout pageName='Sign Up'>
            <div className={styles.outerContainer}>
                <div className={styles.formText}>
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={formik.handleSubmit} noValidate>
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
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className={styles.formErrors}>
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </div>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Password Confirmation</p>
                            </div>
                            <input
                                id='password_confirmation'
                                name='password_confirmation'
                                type='password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password_confirmation}
                            />
                            {formik.touched.password_confirmation &&
                            formik.errors.password_confirmation ? (
                                <div className={styles.formErrors}>
                                    {formik.errors.password_confirmation}
                                </div>
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
