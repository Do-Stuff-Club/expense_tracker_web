// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React, { useState, useEffect } from 'react';
import { Tag, TagState } from '../../redux/tags/types';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';
import { RootState } from '../../redux/store';

// ===================================================================
//                            Component
// ===================================================================
type TagSelectorProps = {
    name: string;
    selectedTag: Tag | undefined;
};

/**
 * Tag selector component. Must be used with
 * <Formik/> context component
 *
 * @param {TagSelectorProps} props - for the component
 * @returns {Element} TagSelector element
 */
export default function TagTreeViewSelector(
    props: TagSelectorProps,
): JSX.Element {
    const [, , helpers] = useField<Tag | undefined>(props.name);

    const [focused, setFocused] = useState<boolean>(false);
    useEffect(() => {
        if (focused) {
            setValue(props.selectedTag);
        }
    }, [props.selectedTag]);

    const tagState: TagState = useSelector<RootState, TagState>(
        (state) => state.tag,
    );

    const { setValue } = helpers;

    return (
        <Autocomplete
            options={Object.values(tagState.map)}
            getOptionLabel={(tag) => tag.name}
            onChange={(event, newValue: Tag | null) => {
                if (newValue) {
                    setValue(newValue);
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label='Search tags'
                    variant='outlined'
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                ></TextField>
            )}
        ></Autocomplete>
    );
}
