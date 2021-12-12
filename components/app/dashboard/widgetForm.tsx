// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik, FormikProps, useFormikContext } from 'formik';
import React from 'react';
import { FormProps } from '../shared/forms/utils';
import FormButton from '../shared/forms/building_blocks/formButton';
import TextField from '../shared/forms/building_blocks/textField';
import { Tag } from '../../../redux/tags/types';
import * as Yup from 'yup';
import FormDatePicker from '../shared/forms/building_blocks/datePicker';
import FormTagSelector from '../shared/forms/building_blocks/tagSelector';
import FormDateRangeTypePicker from '../shared/forms/building_blocks/dateRangePicker';
import { DateRangeType } from '../../../services/date.helper';
import Box from '@mui/material/Box';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type WidgetFormState = {
    date_range_type: DateRangeType;
    start_date: Date;
    end_date: Date;
    tags: ReadonlyArray<Tag>;
};

// ===================================================================
//                            Component
// ===================================================================
type WidgetFormProps = FormProps<WidgetFormState>;

/**
 * Widget Form for creating/editing expenses. This is the outer <form/>
 * component that also provides the Formik context.
 *
 * @param {WidgetFormProps} props - for the component
 * @returns {Element} WidgetForm element
 */
export function WidgetForm(props: WidgetFormProps): JSX.Element {
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
 * Widget Form inputs, including text fields, date pickers, tag selectors, etc.
 * MUST be used as a child of a <WidgetForm /> component.
 * It can be an indirect child of an WidgetForm.
 *
 * @returns {Element} WidgetFormInputs element
 */
export function WidgetFormInputs(): JSX.Element {
    const { values } = useFormikContext<WidgetFormState>();
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

type WidgetFormActionProps = {
    onCancel: () => void;
};

/**
 * Widget Form action buttons, including submit and cancel.
 * MUST be used as a child of a <WidgetForm /> component.
 * It can be an indirect child of an WidgetForm.
 *
 * @param {WidgetFormActionProps} props - for the component
 * @returns {Element} WidgetFormActions element
 */
export function WidgetFormActions(props: WidgetFormActionProps): JSX.Element {
    return (
        <>
            <FormButton name='Cancel' onClick={props.onCancel} />
            <FormButton type='submit' name='Create!' />
        </>
    );
}
