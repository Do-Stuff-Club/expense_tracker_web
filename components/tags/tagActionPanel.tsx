// ===================================================================
//                             Imports
// ===================================================================
import React, { useState } from 'react';
import { Tag, TagState } from '../../redux/tags/types';
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
import styles from './tagActionPanel.module.css';

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
 * Move a tag to a new parent
 *
 * @param {Tag} "selectedTag": the new parent tag
 * @param {TagState} "tags": the tag state
 * @param {Tag} "movingTag": the tag being moved to a new parent
 */
function moveTag(selectedTag: Tag, tags: TagState, movingTag: Tag): void {
    const newParent = selectedTag;
    // Update parent of moving tag to new parent
    const updatedMovingTag: Tag = {
        name: movingTag.name,
        id: movingTag.id,
        parentId: newParent.id,
        childIds: movingTag.childIds,
    };
    // INSERT update tag call for moving tag

    if (movingTag.parentId) {
        // Remove moving tag from old parent
        const oldParent: Tag = tags.map[movingTag.parentId];
        const updatedChildrenIds: ReadonlyArray<number> = oldParent.childIds.filter(
            function (id: number) {
                return id !== movingTag.id;
            },
        );
        const updatedOldParent: Tag = {
            name: oldParent.name,
            id: oldParent.id,
            parentId: oldParent.parentId,
            childIds: updatedChildrenIds,
        };
        // INSERT update tag call for old parent
    } else {
        // do nothing
    }

    // Add moving tag to new parent
    const updatedNewParent: Tag = {
        name: newParent.name,
        id: newParent.id,
        parentId: newParent.parentId,
        childIds: [
            ...(newParent.childIds ? newParent.childIds : []),
            ...[movingTag.id],
        ],
    };
    //INSERT update tag call for new parent
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
    tags: TagState;
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
    const [moveTagOpen, setMoveTagOpen] = useState(false);
    const [movingTag, setMovingtag] = useState<Tag>();
    console.log('moveTagOpen', moveTagOpen);
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
                        setMoveTagOpen(true);
                        if (props.selectedTag != undefined) {
                            const selectedTag = props.selectedTag;
                            setMovingtag(selectedTag);
                        } else {
                            // do nothing
                        }
                    }}
                >
                    <MoveIcon />
                </IconButton>
                <IconButton
                    disabled={!moveTagOpen}
                    onClick={() => {
                        if (props.selectedTag && movingTag) {
                            moveTag(props.selectedTag, props.tags, movingTag);
                        }
                    }}
                >
                    <CheckIcon />
                </IconButton>
                <IconButton
                    disabled={!moveTagOpen}
                    onClick={() => {
                        setMoveTagOpen(false);
                    }}
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
