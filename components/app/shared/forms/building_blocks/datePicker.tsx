// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

// ===================================================================
//                            Component
// ===================================================================
type DatePickerProps = {
    name: string;
    label: string;
};
/**
 * Date picker component. Must be used with
 * <Formik/> context component
 *
 * @param {DatePickerProps} props - for the component
 * @returns {Element} DatePicker element
 */
export default function FormDatePicker(props: DatePickerProps): JSX.Element {
    const [, meta, helpers] = useField<Date>(props.name);

    const { value } = meta;
    const { setValue } = helpers;

    const onChange = (date: Date | null) => {
        if (date) setValue(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker<Date>
                value={value}
                label={props.label}
                onChange={onChange}
                inputFormat='MM/dd/yyyy'
                renderInput={(props) => (
                    <TextField
                        error={meta.touched && meta.error != undefined}
                        helperText={meta.error}
                        {...props}
                    ></TextField>
                )}
            ></DesktopDatePicker>
        </LocalizationProvider>
    );
}
