// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { FormProps } from './utils';
import FormButton from '../inputs/formButton';
import TextField from '../inputs/textField';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type SignUpFormState = {
    email: string;
    password: string;
    password_confirmation: string;
};

// ===================================================================
//                            Component
// ===================================================================
type SignUpFormProps = FormProps<SignUpFormState>;

/**
 * SignUp Form for use on the sign up page. Users sign up using their email
 * and password, with a confirmation. This is the outer <form/>
 * component that also provides the Formik context.
 *
 * @param {SignUpFormProps} props - for the component
 * @returns {Element} SignUpForm element
 */
export function SignUpForm(props: SignUpFormProps): JSX.Element {
    return (
        <Formik
            initialValues={props.initialState}
            validationSchema={Yup.object({
                email: Yup.string()
                    .required('Email cannot be empty')
                    .email('Not a valid email'),
                password: Yup.string()
                    .required('Password cannot be empty')
                    .min(8, 'Password must be at least 8 characters long'),
                password_confirmation: Yup.string()
                    .required('Password confirmation cannot be empty')
                    .test(
                        'passwords-match',
                        "Passwords don't match",
                        function (value) {
                            return this.parent.password === value;
                        },
                    ),
            })}
            onSubmit={props.onSubmit}
        >
            <Form noValidate>{props.children}</Form>
        </Formik>
    );
}

/**
 * SignUp Form inputs, including text fields, date pickers, tag selectors, etc.
 * MUST be used as a child of a <SignUpForm /> component.
 * It can be an indirect child of an SignUpForm.
 *
 * @returns {Element} SignUpFormInputs element
 */
export function SignUpFormInputs(): JSX.Element {
    return (
        <>
            <TextField name='email' label='Email' />
            <TextField name='password' label='Password' type='password' />
            <TextField
                name='password_confirmation'
                label='Password'
                type='password'
            />
        </>
    );
}

/**
 * SignUp Form action buttons, including submit and cancel.
 * MUST be used as a child of a <SignUpForm /> component.
 * It can be an indirect child of an SignUpForm.
 *
 * @returns {Element} SignUpFormActions element
 */
export function SignUpFormActions(): JSX.Element {
    return (
        <>
            <FormButton name='Back' href='/' />
            <FormButton type='submit' name='Log In' />
        </>
    );
}
