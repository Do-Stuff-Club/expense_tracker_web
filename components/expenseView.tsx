import { Expense } from '../redux/expenses/types';
import React from 'react';
import Link from 'next/link';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';

export interface ExpenseViewProps {
    listKey: number;
    expense: Expense;
    onDelete: () => void;
}

export default function ExpenseView(props: ExpenseViewProps) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const onEdit = () => {};
    return (
        <>
            <ListItem divider button onClick={handleClick} key={props.listKey}>
                <ListItemText primary={'Name: ' + props.expense.name} />
                <ListItemText
                    secondary={'Price: ' + props.expense.cost + '$'}
                />
                <ListItemSecondaryAction>
                    <Link
                        href={'/expense/' + props.expense.id + '/edit'}
                        passHref
                    >
                        <IconButton aria-label='Edit' onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton aria-label='Delete' onClick={props.onDelete}>
                        <DeleteIcon />
                    </IconButton>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItem>
                        <ListItemText primary={props.expense.date} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={props.expense.link} />
                    </ListItem>
                </List>
                <List component='div' disablePadding>
                    {props.expense.tags.map((tag, i) => {
                        return (
                            <ListItem button key={i}>
                                <ListItemText primary={tag.name} />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
}
