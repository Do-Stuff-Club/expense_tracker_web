// ===================================================================
//                             Imports
// ===================================================================
import React, { useState } from 'react';
import { Tag } from '../../redux/tags/types';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MoveIcon from '@material-ui/icons/ImportExport';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import NewTagDialog from './newTagDialog';
import EditTagDialog from './editTagDialog';
import {
    createTagCall,
    updateTagCall,
    deleteTagCall,
} from '../../api/tag/call';
import { TagProps } from '../../pages/tags';

// ===================================================================
//                         Helper Functions
// ===================================================================
enum TagAction {
    CREATE = 'tag_action_panel_create',
    RENAME = 'tag_action_panel_rename',
    MOVE = 'tag_action_panel_move',
    DELETE = 'tag_action_panel_delete',
}

/**
 * Custom React hook for use with dialogs.
 *
 * @returns {[boolean, () => void, () => void]} the open state (true/false) and functions to open and close the dialog.
 */
function useDialog(): [boolean, () => void, () => void] {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return [open, handleOpen, handleClose];
}

/**
 * Moves tag from old parent to new parent.
 *
 * @param {Tag} tagToBeMoved - Tag | undefined
 * @param {TagActionPanelProps} props - Props from Redux state
 *
 */
function moveTagToNewParent(
    tagToBeMoved: Tag | undefined,
    props: TagActionPanelProps,
) {
    console.log(tagToBeMoved);
    console.log(props.selectedTag);
    if (tagToBeMoved == undefined) {
        //FIXME - but also, that means i f'd up tag state because they shouldn't be allowed to click that button
    } else if (tagToBeMoved == props.selectedTag) {
        //FIXME - throw error message if they're not moving anything
    } else {
        updateTagCall({
            name: tagToBeMoved.name,
            headers: props.user.authHeaders,
            parent_id: props.selectedTag?.id,
            id: tagToBeMoved.id,
        }).then(
            (data) => props.updateTagAction(data),
            (err) => console.log(err), //FIXME
        );
    }
}

// ===================================================================
//                            Component
// ===================================================================

// FIXME currently the TagActionPanel accepts a ton of props due to the
// "& TagProps" line. We should clean this up and possibly move some of
// this logic up to pages/tag/index.tsx
type TagActionPanelProps = {
    actionHandler?: (action: TagAction) => void;
    selectedTag: Tag | undefined;
} & TagProps;

/**
 * React component that renders a menu of buttons for interacting with tags.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {TagActionPanelProps} props - React properties for TagActionPanel
 * @returns {Element} a button with tag actions
 */
export default function TagActionPanel(
    props: TagActionPanelProps,
): JSX.Element {
    const [newTagOpen, newTagHandleOpen, newTagHandleClose] = useDialog();
    const [editTagOpen, editTagHandleOpen, editTagHandleClose] = useDialog();
    const [moveTag, setMoveTag] = useState<boolean>(false);
    const [tagToBeMoved, setTagToBeMoved] = useState<Tag | undefined>(
        undefined,
    );

    return (
        <>
            <ButtonGroup
                orientation='vertical'
                color='primary'
                aria-label='vertical outlined primary button group'
            >
                <IconButton onClick={newTagHandleOpen}>
                    <AddIcon />
                </IconButton>
                <IconButton
                    disabled={props.selectedTag == undefined}
                    onClick={editTagHandleOpen}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    disabled={props.selectedTag == undefined}
                    onClick={() => {
                        setMoveTag(true);
                        setTagToBeMoved(props.selectedTag);
                    }}
                >
                    <MoveIcon />
                </IconButton>
                <IconButton
                    disabled={moveTag == false}
                    onClick={() => {
                        moveTagToNewParent(tagToBeMoved, props);
                        setMoveTag(false);
                    }}
                >
                    <CheckIcon />
                </IconButton>
                <IconButton
                    disabled={moveTag == false}
                    onClick={() => setMoveTag(false)}
                >
                    <ClearIcon />
                </IconButton>
                <IconButton
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
                    <DeleteIcon />
                </IconButton>
            </ButtonGroup>
            <NewTagDialog
                open={newTagOpen}
                handleClose={newTagHandleClose}
                handleSubmit={(name) => {
                    createTagCall({
                        name: name,
                        headers: props.user.authHeaders,
                        parent_id: props.selectedTag
                            ? props.selectedTag.id
                            : undefined,
                    }).then(
                        (data) => props.createTagAction(data),
                        (err) => console.log(err), // FIXME - needs a real handler
                    );
                }}
            ></NewTagDialog>
            <EditTagDialog
                name={props.selectedTag ? props.selectedTag?.name : ''}
                open={editTagOpen}
                handleClose={editTagHandleClose}
                handleSubmit={(name) => {
                    if (props.selectedTag == undefined) {
                        // FIXME - throw error
                    } else {
                        updateTagCall({
                            name: name,
                            headers: props.user.authHeaders,
                            parent_id: props.selectedTag?.parentId,
                            id: props.selectedTag.id,
                        }).then(
                            (data) => props.updateTagAction(data),
                            (err) => console.log(err), //FIXME
                        );
                    }
                }}
            ></EditTagDialog>
        </>
    );
}
