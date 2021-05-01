// ===================================================================
//                             Imports
// ===================================================================
import { Button, Card, Grid, List, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TagItem from './tagItem';

import { createCategoryAction } from '../redux/tags/action';
import { RootState } from '../redux/store';
import { createCategoryCall } from '../api/tag/call';

// ===================================================================
//                            Component
// ===================================================================
const stateToProps = (state: RootState) => ({
    ...state,
});
const connector = connect(stateToProps, {
    createCategoryAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type CategoryCreatorProps = ReduxProps;

/**
 * Form component for creating Categories
 *
 * @param {CategoryCreatorProps} props - properties are loaded from Redux store
 * @returns {Element} Form
 */
export default function CategoryCreator(
    props: CategoryCreatorProps,
): JSX.Element {
    const [categoryName] = useState<string>('');
    const [required] = useState<boolean>(false);
    const [tagArray, setTagArray] = useState<Array<string>>([]);
    const [newTagName, setNewTagName] = useState<string>('');
    const [newTagHasError, setNewTagHasError] = useState<boolean>(false);
    const [newTagErrorMessage, setNewTagErrorMessage] = useState<string>('');

    const handleChangeNewTagName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target;
        setNewTagName(target.value.trim());
    };

    const addNewTag = () => {
        // Validate new tag name
        if (tagArray.includes(newTagName)) {
            setNewTagHasError(true);
            setNewTagErrorMessage('Tag already exists.');
        } else if (newTagName.trim() == '') {
            setNewTagHasError(true);
            setNewTagErrorMessage('Tag name cannot be empty.');
        } else {
            // Tag is good
            console.log('adding new tag');
            setTagArray([...tagArray, newTagName]);
        }
    };

    const deleteTag = (idx: number) => {
        const newTagArray = tagArray.filter((tag, i) => i !== idx);
        setTagArray(newTagArray);
    };

    const submitCategory = () => {
        createCategoryCall({
            name: categoryName,
            required: required,
            tags: tagArray,
            headers: props.user.authHeaders,
        });
    };

    return (
        <Card>
            <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
            >
                <Grid>
                    <TextField label='Name'></TextField>
                </Grid>
                <Grid>
                    {newTagHasError ? (
                        <TextField
                            label='Tag Name'
                            error
                            helperText={newTagErrorMessage}
                            onChange={(e) => handleChangeNewTagName(e)}
                        />
                    ) : (
                        <TextField
                            label='Tag Name'
                            onChange={(e) => handleChangeNewTagName(e)}
                        />
                    )}
                    <Button onClick={addNewTag}>Add</Button>
                    <List>
                        {tagArray.map((tag, i) => {
                            return (
                                <TagItem
                                    name={tag}
                                    key={i}
                                    onDelete={() => deleteTag(i)}
                                />
                            );
                        })}
                    </List>
                    <Button onClick={submitCategory}>Save</Button>
                </Grid>
            </Grid>
        </Card>
    );
}
