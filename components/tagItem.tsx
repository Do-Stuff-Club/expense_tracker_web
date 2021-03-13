import {
    IconButton,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

type TagItemProps = {
    name: string;
    onDelete: () => void;
};

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
