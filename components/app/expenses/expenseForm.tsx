// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import { FormProps } from '../shared/forms/utils';
import FormButton from '../shared/forms/building_blocks/formButton';
import TextField from '../shared/forms/building_blocks/textField';
import { Tag } from '../../../redux/tags/types';
import * as Yup from 'yup';
import FormDatePicker from '../shared/forms/building_blocks/datePicker';
import FormTagSelector from '../shared/forms/building_blocks/tagSelector';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type ExpenseFormState = {
    name: string;
    price: number;
    date: Date;
    link: string;
    tags: ReadonlyArray<Tag>;
};

// ===================================================================
//                            Component
// ===================================================================
type ExpenseFormProps = FormProps<ExpenseFormState>;

/**
 * Expense Form for creating/editing expenses. This is the outer <form/>
 * component that also provides the Formik context.
 *
 * @param {ExpenseFormProps} props - for the component
 * @returns {Element} ExpenseForm element
 */
export function ExpenseForm(props: ExpenseFormProps): JSX.Element {
    return (
        <Formik
            initialValues={props.initialState}
            validationSchema={Yup.object({
                name: Yup.string().required('Name cannot be empty'),
                price: Yup.number().required('Price cannot be empty'),
                link: Yup.string(),
                date: Yup.date().default(() => new Date()),
                tags: Yup.array(),
            })}
            onSubmit={props.onSubmit}
        >
            <Form noValidate>{props.children}</Form>
        </Formik>
    );
}

/**
 * Expense Form inputs, including text fields, date pickers, tag selectors, etc.
 * MUST be used as a child of a <ExpenseForm /> component.
 * It can be an indirect child of an ExpenseForm.
 *
 * @returns {Element} ExpenseFormInputs element
 */
export function ExpenseFormInputs(): JSX.Element {
    return (
        <>
            <TextField name='name' label='Name' />
            <TextField name='price' label='Price' />
            <FormDatePicker name='date' />
            <TextField name='link' label='Link' />
            <FormTagSelector name='tags'></FormTagSelector>
        </>
    );
}

type ExpenseFormActionProps = {
    onCancel: () => void;
};

/**
 * Expense Form action buttons, including submit and cancel.
 * MUST be used as a child of a <ExpenseForm /> component.
 * It can be an indirect child of an ExpenseForm.
 *
 * @param {ExpenseFormActionProps} props - for the component
 * @returns {Element} ExpenseFormActions element
 */
export function ExpenseFormActions(props: ExpenseFormActionProps): JSX.Element {
    return (
        <>
            <FormButton name='Cancel' onClick={props.onCancel} />
            <FormButton type='submit' name='Create!' />
        </>
    );
}
