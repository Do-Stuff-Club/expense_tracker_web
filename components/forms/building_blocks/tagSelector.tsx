// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import { Tag, TagState } from '../../../redux/tags/types';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TagChip from '../../tags/tagChip';

// ===================================================================
//                            Component
// ===================================================================
type TagSelectorProps = {
    name: string;
    tagState: TagState;
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

    const { value } = meta;
    const { setValue } = helpers;

    const onDeleteTag = (deleteTag: Tag) => {
        const newTags = value.filter((tag) => tag.id != deleteTag.id);
        setValue(newTags);
    };

    return (
        <>
            <Autocomplete
                options={Object.values(props.tagState.map)}
                getOptionLabel={(tag) => tag.name}
                onChange={(event, newValue: Tag | null) => {
                    if (newValue && !value.includes(newValue)) {
                        setValue([...value, newValue]);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Search tags'
                        variant='outlined'
                    ></TextField>
                )}
            ></Autocomplete>
            {value.map((tag) => (
                <TagChip
                    label={tag.name}
                    onDelete={() => onDeleteTag(tag)}
                ></TagChip>
            ))}
        </>
    );
}
