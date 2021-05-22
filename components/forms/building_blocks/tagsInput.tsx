// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React, { useState } from 'react';
import { Tag } from '../../../redux/tags/types';
import TagChip from '../../tagChip';
import FormButton from './formButton';

// ===================================================================
//                         Helper Functions
// ===================================================================
type UnitializedTag = {
    name: string;
};

// ===================================================================
//                            Component
// ===================================================================
type TagsInputProps = {
    name: string;
    category_id: number;
    className?: string;
};

/**
 * Tags input component for creating and editing an array of tags. Must be used with
 * <Formik/> context coComponentmponent
 *
 * @param {TagsInputProps} props - for the component
 * @returns {Element} TextField element
 */
export default function TagsInput({
    className,
    ...props
}: TagsInputProps): JSX.Element {
    // Formik functions
    const [, meta, helpers] = useField<Array<Tag | UnitializedTag>>(props.name);
    const { value } = meta;
    const { setValue } = helpers;

    // Extra component state
    const [newTagName, setNewTagName] = useState<string>('');

    const addNewTag = () => {
        const newTag: UnitializedTag = {
            name: newTagName,
        };
        setValue([...value, newTag]);
    };
    // const styleClasses = className
    //     ? [textFieldStyles.textField, className].join(' ')
    //     : textFieldStyles.textField;
    return (
        <>
            <div /*className={styleClasses}*/>
                <label htmlFor='new_tag'>Add a new tag:</label>
                <input
                    id='new_tag'
                    onChange={(e) => setNewTagName(e.target.value.trim())}
                ></input>
            </div>
            <div /*className={styleClasses}*/>
                {value.map((tag, idx) => (
                    <TagChip label={tag.name} key={idx}></TagChip>
                ))}
            </div>
            <FormButton onClick={addNewTag} name='Add!' variant='text' />
        </>
    );
}
