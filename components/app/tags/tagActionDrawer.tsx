// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Tag } from '../../../redux/tags/types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AppSidePanel from '../shared/layout/appSidePanel';
import {
    createTagCall,
    updateTagCall,
    deleteTagCall,
} from '../../../api/tag/call';
import { TagProps } from '../../../pages/tags/index';
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
import { TagForm, TagFormActions, TagFormInputs } from './tagForm';

// ===================================================================
//                         Helper Functions
// ===================================================================
enum TagAction {
    CREATE = 'tag_action_panel_create',
    RENAME = 'tag_action_panel_rename',
    MOVE = 'tag_action_panel_move',
    DELETE = 'tag_action_panel_delete',
}

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
type TagActionDrawerProps = {
    actionHandler?: (action: TagAction) => void;
    selectedTag: Tag | undefined;
} & TagProps;

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
                    onSubmit={(formState) => {
                        createTagCall({
                            name: formState.name,
                            headers: props.user.authHeaders,
                            parent_id: props.selectedTag
                                ? props.selectedTag.id
                                : undefined,
                        }).then(
                            (data) => props.createTagAction(data),
                            (err) => console.log(err), // FIXME - needs a real handler
                        );
                    }}
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
                    onSubmit={(formState) => {
                        if (props.selectedTag == undefined) {
                            // FIXME - throw error
                        } else {
                            updateTagCall({
                                name: formState.name,
                                headers: props.user.authHeaders,
                                parent_id: props.selectedTag?.parentId,
                                id: props.selectedTag.id,
                            }).then(
                                (data) => props.updateTagAction(data),
                                (err) => console.log(err), //FIXME
                            );
                        }
                    }}
                >
                    <AccordionDetails>
                        <Typography>
                            {props.selectedTag
                                ? 'Selected Tag: ' + props.selectedTag.name
                                : 'Please select an expense.'}
                        </Typography>
                        <TagFormInputs />
                    </AccordionDetails>
                    <AccordionActions>
                        <TagFormActions onCancel={() => setExpanded(false)} />
                    </AccordionActions>
                </TagForm>
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
                            : 'Please select an expense.'}
                    </Typography>
                </AccordionDetails>
                <AccordionActions>
                    <Button onClick={() => console.log('FIXME')}>
                        FIXME Cancel
                    </Button>
                    <Button
                        disabled={props.selectedTag == undefined}
                        onClick={() => {
                            if (props.selectedTag) {
                                deleteTagCall({
                                    id: props.selectedTag.id,
                                    headers: props.user.authHeaders,
                                }).then(
                                    (data) => props.deleteTagAction(data),
                                    (err) => console.log(err), // FIXME - needs a real handler
                                );
                            }
                        }}
                    >
                        Delete
                    </Button>
                </AccordionActions>
            </AppAccordion>
        </AppSidePanel>
    );
}
