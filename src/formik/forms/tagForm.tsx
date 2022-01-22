// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import { FormProps } from './utils';
import FormButton from '../inputs/formButton';
import TextField from '../inputs/textField';
import * as Yup from 'yup';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type TagFormState = {
    name: string;
};

// ===================================================================
//                            Component
// ===================================================================
type TagFormProps = FormProps<TagFormState>;

/**
 * Tag Form for creating/editing tags. This is the outer <form/>
 * component that also provides the Formik context.
 *
 * @param {TagFormProps} props - for the component
 * @returns {Element} TagForm element
 */
export function TagForm(props: TagFormProps): JSX.Element {
    return (
        <Formik
            initialValues={props.initialState}
            validationSchema={Yup.object({
                name: Yup.string().required('Name cannot be empty'),
            })}
            onSubmit={props.onSubmit}
        >
            <Form noValidate>{props.children}</Form>
        </Formik>
    );
}

/**
 * Tag Form inputs, which just includes the name field
 * MUST be used as a child of a <TagForm /> component.
 * It can be an indirect child of an TagForm.
 *
 * @returns {Element} TagFormInputs element
 */
export function TagFormInputs(): JSX.Element {
    return <TextField name='name' label='Name' />;
}

type TagFormActionProps = {
    onCancel: () => void;
};

/**
 * Tag Form action buttons, including submit and cancel.
 * MUST be used as a child of a <TagForm /> component.
 * It can be an indirect child of an TagForm.
 *
 * @param {TagFormActionProps} props - for the component
 * @returns {Element} TagFormActions element
 */
export function TagFormActions(props: TagFormActionProps): JSX.Element {
    return (
        <>
            <FormButton name='Cancel' onClick={props.onCancel} />
            <FormButton type='submit' name='Create!' />
        </>
    );
}
