// ===================================================================
//                             Imports
// ===================================================================
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import FormButton from '../../components/formButton';
import styles from '../../styles/Form.module.css';
import textFieldStyles from '../../styles/TextField.module.css';
import TagChip from '../../components/tagChip';

import {
    createCategoryAction,
    updateAllCategoriesAction,
} from '../../redux/tags/action';
import { RootState } from '../../redux/store';
import withAuth from '../../components/withAuthentication';
import TestComponent from '../../components/debug';
import PageLayout from '../../components/pageLayout';
import { createCategoryCall } from '../../api/tag/call';

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
    updateAllCategoriesAction,
    createCategoryAction,
});
type ReduxProps = ConnectedProps<typeof connector>;
type NewCategoryProps = ReduxProps;

/**
 * New Category page component. Has a form for creating new categories and tags.
 *
 * @param {NewCategoryProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function NewCategory(props: NewCategoryProps) {
    const [categoryName, setCategoryName] = useState<string>('');
    const [required, setRequired] = useState<boolean>(false);
    const [tagArray, setTagArray] = useState<Array<string>>([]);
    const [newTagName, setNewTagName] = useState<string>('');
    const [newTagHasError, setNewTagHasError] = useState<boolean>(false);
    const [newTagErrorMessage, setNewTagErrorMessage] = useState<string>('');
    const router = useRouter();

    const handleChangeCategoryName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target;
        setCategoryName(target.value.trim());
    };

    const handleChangeNewTagName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target;
        setNewTagName(target.value.trim());
    };

    const handleChangeRequired = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRequired(event.target.checked);
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
        }).then(
            (data) => {
                props.createCategoryAction(data);
                router.push('/category');
            },
            (error) => console.log(error),
        );
    };

    return (
        <PageLayout pageName='Create Category'>
            <div className={styles.outerContainer}>
                <div className={styles.formText}>
                    <h1>Create a New Category</h1>
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
                    <div>
                        {tagArray.map((tag, i) => {
                            return (
                                <div className={styles.tagsContainer} key={i}>
                                    <TagChip
                                        label={tag}
                                        key={i}
                                        onDelete={() => deleteTag(i)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.formButtonContainer}>
                        <FormButton href='/category' name='Cancel' />
                    </div>
                    <div className={styles.formButtonContainer}>
                        <FormButton onClick={submitCategory} name='Submit' />
                    </div>
                </div>
            </div>
            <TestComponent></TestComponent>
        </PageLayout>
    );
}

export default connector(withAuth(NewCategory));
