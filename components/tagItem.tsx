// ===================================================================
//                             Imports
// ===================================================================
import {
    IconButton,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

// ===================================================================
//                            Component
// ===================================================================
type TagItemProps = {
    name: string;
    onDelete: () => void;
};

/**
 * Helper function component for displaying Tags. Deleteable.
 *
 * @param {TagItemProps} props - properties including tag name and deletion handler
 * @returns {Element} ListItem representing the Tag
 */
export default function TagItem(props: TagItemProps): JSX.Element {
    return (
        <ListItem divider>
            <ListItemText primary={props.name}></ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label='Delete'>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
