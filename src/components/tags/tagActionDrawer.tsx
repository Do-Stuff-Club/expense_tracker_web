// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Tag } from '../../redux/tags/types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoveIcon from '@mui/icons-material/SwapVert';
import AppSidePanel from '../layout/appSidePanel';
import {
    AccordionProps,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    AccordionActions,
    Button,
} from '@mui/material';
import styled from '@mui/styled-engine';
import {
    TagForm,
    TagFormActions,
    TagFormInputs,
    TagFormState,
} from '../../formik/forms/tagForm';

import {
    TagMoveForm,
    TagMoveFormActions,
    TagMoveFormInputs,
    TagMoveFormState,
} from '../../formik/forms/tagMoveForm';

import {
    CreateTagParams,
    MoveTagParams,
    OneTagData,
    UpdateTagParams,
} from '../../api/tag/types';

// ===================================================================
//                         Helper Functions
// ===================================================================

const AppAccordion = styled((props: AccordionProps) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(() => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

// ===================================================================
//                            Component
// ===================================================================

// FIXME currently the TagActionDrawer accepts a ton of props due to the
// "& TagProps" line. We should clean this up and possibly move some of
// this logic up to pages/tag/index.tsx
// type TagActionDrawerProps = {
//     actionHandler?: (action: TagAction) => void;
//     selectedTag: Tag | undefined;
// } & TagProps;

type TagActionDrawerProps = {
    selectedTag: Tag | undefined;
    createNewTagAction: (
        data: CreateTagParams,
    ) => Promise<OneTagData | undefined>;
    updateTagAction: (data: UpdateTagParams) => Promise<OneTagData | undefined>;
    moveTagAction: (data: MoveTagParams) => Promise<OneTagData | undefined>;
    deleteTagAction: (tagId: number) => Promise<OneTagData | undefined>;
};

/**
 * React component that renders a menu of buttons for interacting with tags.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {TagActionDrawerProps} props - React properties for TagActionDrawer
 * @returns {Element} a button with tag actions
 */
export default function TagActionDrawer(
    props: TagActionDrawerProps,
): JSX.Element {
    const [expanded, setExpanded] = React.useState<
        'new' | 'edit' | 'move' | 'delete' | false
    >(false);

    const handleChange = (
        panel: 'new' | 'edit' | 'move' | 'delete' | false,
    ) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        if (panel) setExpanded(newExpanded ? panel : false);
        else setExpanded(false);
    };

    //#region button handlers
    const onCreateTagSubmit = (formState: TagFormState): void => {
        const { createNewTagAction, selectedTag } = props;

        createNewTagAction({
            name: formState.name,
            parentId: selectedTag ? selectedTag.id : undefined,
        });
    };

    const onEditTagSubmit = (formState: TagFormState): void => {
        const { updateTagAction, selectedTag } = props;
        if (selectedTag !== undefined) {
            updateTagAction({
                name: formState.name,
                parentId: selectedTag?.parentId,
                id: selectedTag.id,
            });
        }
    };

    const onMoveTagSubmit = (formState: TagMoveFormState): void => {
        const { moveTagAction } = props;
        if (
            formState.toMove !== undefined &&
            formState.newParent !== undefined
        ) {
            moveTagAction({
                id: formState.toMove.id,
                name: formState.toMove.name,
                new_parent_id: formState.newParent.id,
            });
        }
    };

    const onDeleteTagSubmit = (): void => {
        const { deleteTagAction, selectedTag } = props;
        if (selectedTag) {
            deleteTagAction(selectedTag.id);
        }
    };
    //#endregion

    return (
        <AppSidePanel direction='left'>
            <AppAccordion
                expanded={expanded === 'new'}
                onChange={handleChange('new')}
            >
                <AccordionSummary
                    aria-controls='panel1d-content'
                    id='panel1d-header'
                >
                    <AddIcon />
                    <Typography>Create Tag</Typography>
                </AccordionSummary>
                <TagForm
                    initialState={{
                        name: '',
                    }}
                    onSubmit={onCreateTagSubmit}
                >
                    <AccordionDetails>
                        <TagFormInputs />
                    </AccordionDetails>
                    <AccordionActions>
                        <TagFormActions onCancel={() => setExpanded(false)} />
                    </AccordionActions>
                </TagForm>
            </AppAccordion>
            <AppAccordion
                expanded={expanded === 'edit'}
                onChange={handleChange('edit')}
            >
                <AccordionSummary
                    aria-controls='panel1d-content'
                    id='panel1d-header'
                >
                    <EditIcon />
                    <Typography>Edit Tag</Typography>
                </AccordionSummary>
                <TagForm
                    initialState={
                        props.selectedTag != null
                            ? {
                                  name: props.selectedTag.name,
                              }
                            : {
                                  name: '',
                              }
                    }
                    onSubmit={onEditTagSubmit}
                >
                    <AccordionDetails>
                        <Typography>
                            {props.selectedTag
                                ? 'Selected Tag: ' + props.selectedTag.name
                                : 'Please select a tag.'}
                        </Typography>
                        <TagFormInputs />
                    </AccordionDetails>
                    <AccordionActions>
                        <TagFormActions onCancel={() => setExpanded(false)} />
                    </AccordionActions>
                </TagForm>
            </AppAccordion>
            <AppAccordion
                expanded={expanded === 'move'}
                onChange={handleChange('move')}
            >
                <AccordionSummary
                    aria-controls='panel1d-content'
                    id='panel1d-header'
                >
                    <MoveIcon />
                    <Typography>Move Tag</Typography>
                </AccordionSummary>
                <TagMoveForm
                    initialState={{ toMove: undefined, newParent: undefined }}
                    onSubmit={onMoveTagSubmit}
                >
                    <AccordionDetails>
                        <TagMoveFormInputs selectedTag={props.selectedTag} />
                    </AccordionDetails>
                    <AccordionActions>
                        <TagMoveFormActions
                            onCancel={() => setExpanded(false)}
                        />
                    </AccordionActions>
                </TagMoveForm>
            </AppAccordion>
            <AppAccordion
                expanded={expanded === 'delete'}
                onChange={handleChange('delete')}
            >
                <AccordionSummary
                    aria-controls='panel1d-content'
                    id='panel1d-header'
                >
                    <DeleteIcon />
                    <Typography>Delete Tag</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.selectedTag
                            ? 'Selected Tag: ' + props.selectedTag.name
                            : 'Please select a tag.'}
                    </Typography>
                </AccordionDetails>
                <AccordionActions>
                    <Button onClick={() => console.log('FIXME')}>
                        FIXME Cancel
                    </Button>
                    <Button
                        disabled={props.selectedTag == undefined}
                        onClick={onDeleteTagSubmit}
                    >
                        Delete
                    </Button>
                </AccordionActions>
            </AppAccordion>
        </AppSidePanel>
    );
}
