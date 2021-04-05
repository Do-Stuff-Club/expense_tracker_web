import { Button, Card, Grid, List, Switch, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import EditTagItem from '../../../components/editTagItem';

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
                <Card>
                    <Grid
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                    >
                        <Grid>
                            <TextField
                                label='Name'
                                onChange={handleChangeCategoryName}
                                defaultValue={category.name}
                            ></TextField>
                            <Switch
                                checked={category.required}
                                onChange={handleChangeRequired}
                            ></Switch>
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
                            <Link href='/category'>Done Editing</Link>
                        </Grid>
                    </Grid>
                </Card>
            </PageLayout>
        );
    }
}

export default connector(withAuth(EditCategory));
