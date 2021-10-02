// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import styles from '../shared/forms/Form.module.css';
import { FormProps } from '../shared/forms/utils';
import FormButton from '../shared/forms/building_blocks/formButton';
import TextField from '../shared/forms/building_blocks/textField';
import { Tag, TagState } from '../../../redux/tags/types';
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
type ExpenseFormProps = FormProps<ExpenseFormState> & {
    tagState: TagState;
};

/**
 * Expense Form for creating/editing expenses.
 *
 * @param {ExpenseFormProps} props - for the component
 * @returns {Element} ExpenseForm element
 */
export default function ExpenseForm(props: ExpenseFormProps): JSX.Element {
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
            <Form noValidate className={styles.formContainer}>
                <TextField
                    name='name'
                    label='Name'
                    className={styles.textField}
                />
                <TextField
                    name='price'
                    label='Price'
                    className={styles.textField}
                />
                <FormDatePicker name='date' />
                <TextField
                    name='link'
                    label='Link'
                    className={styles.textField}
                />
                <FormTagSelector
                    name='tags'
                    tagState={props.tagState}
                ></FormTagSelector>
                <div
                    className={`${styles.formButtonContainer} ${styles.submitButton}`}
                >
                    <FormButton type='submit' name='Create!' />
                </div>
            </Form>
        </Formik>
    );
}
