// ===================================================================
//                             Imports
// ===================================================================
import { Button, Card, Grid, List, Switch, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import EditTagItem from '../../../components/editTagItem';

import FormButton from '../../../components/formButton';
import styles from '../../../styles/Form.module.css';
import textFieldStyles from '../../../styles/TextField.module.css';

import {
    updateOneCategoryAction,
    updateAllCategoriesAction,
} from '../../../redux/tags/action';
import { RootState } from '../../../redux/store';
import withAuth from '../../../components/withAuthentication';
import { Category, Tag } from '../../../redux/tags/types';
import PageLayout from '../../../components/pageLayout';
import {
    createTagCall,
    deleteTagCall,
    updateCategoryCall,
    updateTagCall,
} from '../../../api/tag/call';

// ===================================================================
//                            Component
// ===================================================================

const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});
const connector = connect(stateToProps, {
    updateOneCategoryAction,
    updateAllCategoriesAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type EditCategoryProps = ReduxProps;

function EditCategory(props: EditCategoryProps) {
    const [, setCategoryName] = useState<string>('');
    const [newTagName, setNewTagName] = useState<string>('');
    const [newTagHasError, setNewTagHasError] = useState<boolean>(false);
    const [newTagErrorMessage, setNewTagErrorMessage] = useState<string>('');
    const router = useRouter();

    const { id } = router.query; //FIXME set type for router query
    console.log(props);
    const category = props.tag.categories.find(
        // @ts-expect-error FIXME- router query type doesn't work as I want it to, temporarily ignore types
        (category) => category.id == parseInt(id), // FIXME handle issue where index is not found
    );

    const handleIdError = () => {
        return;
    };

    const handleChangeNewTagName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target;
        setNewTagName(target.value.trim());
    };

    if (category == null) {
        handleIdError();
        return <></>; // FIXME
    } else {
        const handleChangeCategoryName = (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            const newName = event.target.value.trim();
            setCategoryName(newName);
        };
        const addNewTag = () => {
            // Validate new tag name
            category.tags.forEach((tag) => {
                if (tag.name == newTagName) {
                    setNewTagHasError(true);
                    setNewTagErrorMessage('Tag already exists.');
                } else if (newTagName == '') {
                    setNewTagHasError(true);
                    setNewTagErrorMessage('Tag name cannot be empty.');
                }
            });
            if (!newTagHasError) {
                // Tag is good
                console.log('adding new tag');
                createTagCall({
                    name: newTagName,
                    category: category,
                    headers: props.user.authHeaders,
                }).then(
                    (data) => props.updateOneCategoryAction(data),
                    (error) => console.log(error),
                );
            }
        };

        const validateTagText = (id: number) => (
            newName: string,
        ): [boolean, string] => {
            const otherTags = category.tags.filter((tag) => tag.id != id);
            for (let i = 0; i < otherTags.length; i++) {
                if (otherTags[i].name == newName) {
                    return [true, 'Tag already exists'];
                } else if (newName == '') {
                    return [true, 'Tag name cannot be empty'];
                }
            }
            return [false, ''];
        };
        const onRename = (tag: Tag) => (newName: string): void => {
            const newTag = {
                ...tag,
                name: newName,
            };
            updateTagCall({
                tag: newTag,
                category: category,
                headers: props.user.authHeaders,
            }).then(
                (data) => props.updateOneCategoryAction(data),
                (error) => console.log(error),
            );
        };
        const onDelete = (id: number) => (): void => {
            deleteTagCall({
                id: id,
                category: category,
                headers: props.user.authHeaders,
            }).then(
                (data) => props.updateOneCategoryAction(data),
                (error) => console.log(error),
            );
        };
        const handleChangeRequired = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const newCategory: Category = {
                ...category,
                required: event.target.checked,
            };
            updateCategoryCall({
                category: newCategory,
                headers: props.user.authHeaders,
            }).then(
                (data) => props.updateAllCategoriesAction(data), // FIXME this should probably be update ONE category
                (error) => console.log(error),
            ); // FIXME add error handling
        };
        return (
            <PageLayout pageName='Edit Category'>
                <div className={styles.outerContainer}>
                    <div className={styles.formText}>
                        <h1>Edit Category</h1>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={textFieldStyles.textField}>
                            <div>
                                <p>Name</p>
                            </div>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                onChange={handleChangeCategoryName}
                                defaultValue={category.name}
                            ></input>
                            <div>
                                <p>Required</p>
                            </div>
                            <input
                                id='required'
                                name='required'
                                type='checkbox'
                                onChange={handleChangeRequired}
                            ></input>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className={textFieldStyles.textField}>
                                <div>
                                    <p>Tag</p>
                                </div>
                                <input
                                    id='tag'
                                    name='tag'
                                    type='text'
                                    onChange={(e) => handleChangeNewTagName(e)}
                                ></input>
                                {newTagHasError ? (
                                    <div className={styles.formErrors}>
                                        {newTagErrorMessage}
                                    </div>
                                ) : null}
                            </div>
                            <div className={styles.formButtonContainer}>
                                <FormButton
                                    onClick={addNewTag}
                                    name='Add!'
                                    variant='text'
                                />
                            </div>
                        </div>
                        <Grid>
                            {/* {newTagHasError ? (
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
                            )} */}
                            {/* <Button onClick={addNewTag}>Add</Button> */}
                            <List>
                                {category.tags.map((tag, i) => {
                                    return (
                                        <EditTagItem
                                            name={tag.name}
                                            id={tag.id}
                                            validateTagText={validateTagText(
                                                tag.id,
                                            )}
                                            onDelete={onDelete(tag.id)}
                                            onRename={onRename(tag)}
                                            key={i}
                                        />
                                    );
                                })}
                            </List>
                            <div className={styles.formButtonContainer}>
                                <FormButton
                                    href='/category'
                                    name='Done Editing'
                                />
                            </div>
                        </Grid>
                    </div>
                </div>
            </PageLayout>
        );
    }
}

export default connector(withAuth(EditCategory));
