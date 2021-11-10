// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import { FormProps } from '../shared/forms/utils';
import FormButton from '../shared/forms/building_blocks/formButton';
import TextField from '../shared/forms/building_blocks/textField';
import * as Yup from 'yup';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type ExpenseSelectorFormState = {
    name: string;
};

// ===================================================================
//                            Component
// ===================================================================
type ExpenseSelectorFormProps = FormProps<ExpenseSelectorFormState>;

/**
 * ExpenseSelector Form for creating/editing tags. This is the outer <form/>
 * component that also provides the Formik context.
 *
 * @param {ExpenseSelectorFormProps} props - for the component
 * @returns {Element} ExpenseSelectorForm element
 */
export function ExpenseSelectorForm(
    props: ExpenseSelectorFormProps,
): JSX.Element {
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
 * ExpenseSelector Form inputs, which just includes the name field
 * MUST be used as a child of a <ExpenseSelectorForm /> component.
 * It can be an indirect child of an ExpenseSelectorForm.
 *
 * @returns {Element} ExpenseSelectorFormInputs element
 */
export function ExpenseSelectorFormInputs(): JSX.Element {
    return <TextField name='name' label='Name' />;
}

type ExpenseSelectorFormActionProps = {
    onCancel: () => void;
};

/**
 * ExpenseSelector Form action buttons, including submit and cancel.
 * MUST be used as a child of a <ExpenseSelectorForm /> component.
 * It can be an indirect child of an ExpenseSelectorForm.
 *
 * @param {ExpenseSelectorFormActionProps} props - for the component
 * @returns {Element} ExpenseSelectorFormActions element
 */
export function ExpenseSelectorFormActions(
    props: ExpenseSelectorFormActionProps,
): JSX.Element {
    return (
        <>
            <FormButton name='Cancel' onClick={props.onCancel} />
            <FormButton type='submit' name='Create!' />
        </>
    );
}
