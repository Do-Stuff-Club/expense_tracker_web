// ===================================================================
//                             Imports
// ===================================================================
import { Form, Formik } from 'formik';
import React from 'react';
import { FormProps } from './utils';
import FormButton from '../inputs/formButton';
import * as Yup from 'yup';
import { Tag } from '../../redux/tags/types';
import TagTreeViewSelector from '../inputs/tagTreeViewSelector';

// ===================================================================
//                         Helper Functions
// ===================================================================
export type TagMoveFormState = {
    toMove: Tag | undefined;
    newParent: Tag | undefined;
};

// ===================================================================
//                            Component
// ===================================================================
type TagMoveFormProps = FormProps<TagMoveFormState>;

/**
 * Tag Form for creating/editing tags. This is the outer <form/>
 * component that also provides the Formik context.
 *
 * @param {TagMoveFormProps} props - for the component
 * @returns {Element} TagMoveForm element
 */
export function TagMoveForm(props: TagMoveFormProps): JSX.Element {
    return (
        <Formik
            initialValues={props.initialState}
            validationSchema={Yup.object({
                toMove: Yup.object().required('Tag to move cannot be empty'),
                newParent: Yup.object().required(
                    'New parent tag cannot be empty',
                ),
            })}
            onSubmit={props.onSubmit}
        >
            <Form noValidate>{props.children}</Form>
        </Formik>
    );
}

type TagMoveFormInputProps = {
    selectedTag: Tag | undefined;
};

/**
 * Tag Form inputs, which just includes the name field
 * MUST be used as a child of a <TagMoveForm /> component.
 * It can be an indirect child of an TagMoveForm.
 *
 * @param {TagMoveFormInputProps} props - for the component
 * @returns {Element} TagMoveFormInputs element
 */
export function TagMoveFormInputs(props: TagMoveFormInputProps): JSX.Element {
    return (
        <>
            <TagTreeViewSelector
                name='toMove'
                selectedTag={props.selectedTag}
            />
            <TagTreeViewSelector
                name='newParent'
                selectedTag={props.selectedTag}
            />
        </>
    );
}

type TagMoveFormActionProps = {
    onCancel: () => void;
};

/**
 * Tag Form action buttons, including submit and cancel.
 * MUST be used as a child of a <TagMoveForm /> component.
 * It can be an indirect child of an TagMoveForm.
 *
 * @param {TagMoveFormActionProps} props - for the component
 * @returns {Element} TagMoveFormActions element
 */
export function TagMoveFormActions(props: TagMoveFormActionProps): JSX.Element {
    return (
        <>
            <FormButton name='Cancel' onClick={props.onCancel} />
            <FormButton type='submit' name='Move Tag' />
        </>
    );
}
