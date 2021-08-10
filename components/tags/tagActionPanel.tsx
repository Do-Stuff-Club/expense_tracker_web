// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Tag, TagState } from '../../redux/tags/types';
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
 * @param {Tag|undefined} selectedTag - Possible selected Tag
 */
function actionHandler(action: TagAction, selectedTag?: Tag): void {
    // FIXME implement this function
    console.log(action);
    console.log(selectedTag);
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
    actionHandler(TagAction.CREATE); // Dummy line to make lint happy
    return <div>{JSON.stringify(props)}</div>;
}
