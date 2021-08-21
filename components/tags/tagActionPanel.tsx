// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Tag, TagState } from '../../redux/tags/types';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MoveIcon from '@material-ui/icons/ImportExport';
import EditIcon from '@material-ui/icons/Edit';

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
 * Helper function that dispatches Redux actions depending on the action being used
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {TagAction} action - Action type to process
 * @param {TagState} tags - Current Tags
 * @param {Tag|undefined} selectedTag - Possible selected Tag
 */
function actionHandler(
    action: TagAction,
    tags: TagState,
    selectedTag?: Tag,
): void {
    // FIXME implement this function
    console.log(action);
    console.log(selectedTag);
    console.log(tags);
}

// ===================================================================
//                            Component
// ===================================================================
type TagActionPanelProps = {
    tags: TagState;
    actionHandler?: (action: TagAction) => void;
};

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
    // FIXME
    actionHandler(TagAction.CREATE, props.tags); // Dummy line to make lint happy
    return (
        <ButtonGroup
            orientation='vertical'
            color='primary'
            aria-label='vertical outlined primary button group'
        >
            <IconButton>
                <AddIcon />
            </IconButton>
            <IconButton>
                <EditIcon />
            </IconButton>
            <IconButton>
                <MoveIcon />
            </IconButton>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </ButtonGroup>
    );
}
