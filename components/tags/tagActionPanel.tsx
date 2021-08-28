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
import NewTagDialog from './newTagDialog';
import { createTagCall, deleteTagCall } from '../../api/tag/call';
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
                <IconButton disabled={props.selectedTag == undefined}>
                    <EditIcon />
                </IconButton>
                <IconButton disabled={props.selectedTag == undefined}>
                    <MoveIcon />
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
        </>
    );
}