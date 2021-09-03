// ===================================================================
//                             Imports
// ===================================================================
import React, { useState } from 'react';
import { Expense } from '../../redux/expenses/types';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NewExpenseDialog from './newExpenseDialog';
//import EditExpenseDialog from './editExpenseDialog';
import {
    createExpenseCall,
    updateExpenseCall,
    deleteExpenseCall,
} from '../../api/expense/call';
import { ExpensesProps } from '../../pages/expenses/index';
import EditExpenseDialog from './editExpenseDialog';

// ===================================================================
//                         Helper Functions
// ===================================================================
enum ExpenseAction {
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

// FIXME currently the ExpenseActionPanel accepts a ton of props due to the
// "& ExpenseProps" line. We should clean this up and possibly move some of
// this logic up to pages/tag/index.tsx
type ExpenseActionPanelProps = {
    actionHandler?: (action: ExpenseAction) => void;
    selectedExpense: Expense | undefined;
} & ExpensesProps;

/**
 * React component that renders a menu of buttons for interacting with tags.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {ExpenseActionPanelProps} props - React properties for ExpenseActionPanel
 * @returns {Element} a button with tag actions
 */
export default function ExpenseActionPanel(
    props: ExpenseActionPanelProps,
): JSX.Element {
    const [
        newExpenseOpen,
        newExpenseHandleOpen,
        newExpenseHandleClose,
    ] = useDialog();
    const [
        editExpenseOpen,
        editExpenseHandleOpen,
        editExpenseHandleClose,
    ] = useDialog();
    return (
        <>
            <ButtonGroup
                orientation='vertical'
                color='primary'
                aria-label='vertical outlined primary button group'
            >
                <IconButton onClick={newExpenseHandleOpen}>
                    <AddIcon />
                </IconButton>
                <IconButton
                    disabled={props.selectedExpense == undefined}
                    onClick={editExpenseHandleOpen}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    disabled={props.selectedExpense == undefined}
                    onClick={() => {
                        if (props.selectedExpense) {
                            deleteExpenseCall({
                                id: props.selectedExpense.id,
                                headers: props.user.authHeaders,
                            }).then(
                                (data) => props.updateAllExpensesAction(data),
                                (err) => console.log(err), // FIXME - needs a real handler
                            );
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </ButtonGroup>
            <NewExpenseDialog
                tagState={props.tag}
                open={newExpenseOpen}
                handleClose={newExpenseHandleClose}
                handleSubmit={(formState) => {
                    console.log('SUBMITT');
                    createExpenseCall({
                        name: formState.name,
                        cost: formState.price,
                        date: formState.date.toDateString(),
                        link: formState.link,
                        tags: formState.tags,
                        headers: props.user.authHeaders,
                    }).then(
                        (data) => props.createExpenseAction(data),
                        (err) => console.log(err), // FIXME - needs a real handler
                    );
                }}
            ></NewExpenseDialog>
            {
                props.selectedExpense != undefined ? (
                    <EditExpenseDialog
                        expense={props.selectedExpense}
                        tagState={props.tag}
                        open={editExpenseOpen}
                        handleClose={editExpenseHandleClose}
                        handleSubmit={(formState) => {
                            if (props.selectedExpense == undefined) {
                                // FIXME - throw error
                            } else {
                                updateExpenseCall({
                                    expense: {
                                        id: props.selectedExpense.id,
                                        name: formState.name,
                                        cost: formState.price,
                                        date: formState.date.toDateString(),
                                        link: formState.link,
                                        tags: formState.tags,
                                    },
                                    headers: props.user.authHeaders,
                                }).then(
                                    (data) => {
                                        console.log(data);
                                        props.updateOneExpenseAction(data);
                                    },
                                    (err) => console.log(err), //FIXME
                                );
                            }
                        }}
                    ></EditExpenseDialog>
                ) : null // FIXME this is a bit weird- editing requires a selected expense, so editExpenseDialog cannot exist without selectedExpense. However, I'm not sure if this is the best way to represent that.
            }
        </>
    );
}
