// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import { TextField } from '@mui/material';

// ===================================================================
//                            Component
// ===================================================================
type FormTextFieldProps = {
    name: string;
    label: string;
    className?: string;
    type?: string;
};

/**
 * Text field component with label and text input. Must be used with
 * <Formik/> context component
 *
 * @param {FormTextField} props - for the component
 * @returns {Element} FormTextField element
 */
export default function FormTextField({
    ...props
}: FormTextFieldProps): JSX.Element {
    const [field, meta] = useField<string>(props.name);
    return (
        <TextField
            id={props.name}
            error={meta.touched && meta.error != undefined}
            helperText={meta.error}
            {...field}
            {...props}
        ></TextField>
    );
}
