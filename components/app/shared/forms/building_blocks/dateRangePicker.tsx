// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DateRangeType } from '../../../../../services/date.helper';

// ===================================================================
//                            Component
// ===================================================================
type DateRangeTypePickerProps = {
    name: string;
};

/**
 * Date picker component. Must be used with
 * <Formik/> context component
 *
 * @param {DateRangeTypePickerProps} props - for the component
 * @returns {Element} DateRangeTypePicker element
 */
export default function FormDateRangeTypePicker(
    props: DateRangeTypePickerProps,
): JSX.Element {
    const [, meta, helpers] = useField<DateRangeType>(props.name);

    const { value } = meta;
    const { setValue } = helpers;

    return (
        <>
            <InputLabel id='demo-simple-select-standard-label'>
                Date Range Selector
            </InputLabel>
            <Select<DateRangeType | ''>
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                value={value}
                onChange={(event) => {
                    if (event.target.value != '')
                        setValue(event.target.value as DateRangeType);
                }}
                label='Age'
            >
                <MenuItem value='MTD'>Month to date</MenuItem>
                <MenuItem value='YTD'>Year to date</MenuItem>
                <MenuItem value='CUSTOM_RANGE'>Custom date range</MenuItem>
            </Select>
        </>
    );
}
