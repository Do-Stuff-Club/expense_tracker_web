// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik, useFormikContext } from 'formik';
import React from 'react';
import { FormProps } from './utils';
import FormButton from '../inputs/formButton';
import { Tag } from '../../redux/tags/types';
import * as Yup from 'yup';
import FormDatePicker from '../inputs/datePicker';
import FormTagSelector from '../inputs/tagSelector';
import FormDateRangeTypePicker from '../inputs/dateRangePicker';
import { DateRangeType } from '../../services/date.helper';
import Box from '@mui/material/Box';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type ExpenseSelectorFormState = {
    date_range_type: DateRangeType;
    start_date: Date;
    end_date: Date;
    tags: ReadonlyArray<Tag>;
};

// ===================================================================
//                            Component
// ===================================================================
type ExpenseSelectorFormProps = FormProps<ExpenseSelectorFormState>;

/**
 * ExpenseSelector Form for creating/editing expenses. This is the outer <form/>
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
                date_range_type: Yup.mixed<DateRangeType>().required(
                    'Please select a date range type',
                ),
                start_date: Yup.date().when('date_range_type', {
                    is: (value: DateRangeType) => value == 'CUSTOM_RANGE',
                    then: Yup.date().required('Please select a start date'),
                    otherwise: Yup.date().notRequired(),
                }),
                end_date: Yup.date().when('date_range_type', {
                    is: (value: DateRangeType) => value == 'CUSTOM_RANGE',
                    then: Yup.date()
                        .required('Please select an end date')
                        .min(
                            Yup.ref('start_date'),
                            'End date cannot be earlier than start date',
                        ),
                    otherwise: Yup.date().notRequired(),
                }),
                tags: Yup.array(),
            })}
            onSubmit={props.onSubmit}
        >
            <Form noValidate>{props.children}</Form>
        </Formik>
    );
}

/**
 * ExpenseSelector Form inputs, including text fields, date pickers, tag selectors, etc.
 * MUST be used as a child of a <ExpenseSelectorForm /> component.
 * It can be an indirect child of an ExpenseSelectorForm.
 *
 * @returns {Element} ExpenseSelectorFormInputs element
 */
export function ExpenseSelectorFormInputs(): JSX.Element {
    const { values } = useFormikContext<ExpenseSelectorFormState>();
    return (
        <>
            <FormDateRangeTypePicker name='date_range_type' />
            <Box
                display={
                    values.date_range_type != 'CUSTOM_RANGE'
                        ? 'none'
                        : undefined
                }
            >
                <FormDatePicker name='start_date' label='Start' />
                <FormDatePicker name='end_date' label='End' />
            </Box>
            <FormTagSelector name='tags'></FormTagSelector>
        </>
    );
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
