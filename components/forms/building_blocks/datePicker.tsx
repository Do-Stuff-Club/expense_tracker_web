// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// ===================================================================
//                            Component
// ===================================================================
type DatePickerProps = {
    name: string;
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

    const onChange = (date: MaterialUiPickersDate) => {
        if (date) setValue(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                value={value}
                onChange={onChange}
                format='MM/dd/yyyy'
            ></KeyboardDatePicker>
        </MuiPickersUtilsProvider>
    );
}
