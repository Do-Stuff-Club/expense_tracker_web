// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import { Tag, TagState } from '../../../../../redux/tags/types';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';
import TagChip from '../../../tags/tagChip';
import { RootState } from '../../../../../redux/store';

// ===================================================================
//                            Component
// ===================================================================
type TagSelectorProps = {
    name: string;
};
/**
 * Tag selector component. Must be used with
 * <Formik/> context component
 *
 * @param {TagSelectorProps} props - for the component
 * @returns {Element} TagSelector element
 */
export default function FormTagSelector(props: TagSelectorProps): JSX.Element {
    const [, meta, helpers] = useField<ReadonlyArray<Tag>>(props.name);

    const tagState: TagState = useSelector<RootState, TagState>(
        (state) => state.tag,
    );

    const { value } = meta;
    const { setValue } = helpers;

    const onDeleteTag = (deleteTag: Tag) => {
        const newTags = value.filter((tag) => tag.id != deleteTag.id);
        setValue(newTags);
    };

    return (
        <>
            <Autocomplete
                multiple
                options={Object.values(tagState.map)}
                getOptionLabel={(tag) => tag.name}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Search tags'
                        variant='outlined'
                    ></TextField>
                )}
                renderTags={(tags) =>
                    tags.map((tag, idx) => (
                        <TagChip
                            key={idx}
                            label={tag.name}
                            onDelete={() => onDeleteTag(tag)}
                        ></TagChip>
                    ))
                }
            ></Autocomplete>
        </>
    );
}
