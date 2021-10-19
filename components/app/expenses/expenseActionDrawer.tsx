// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Expense } from '../../../redux/expenses/types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import EditExpenseDialog from './editExpenseDialog';
import AppSidePanel from '../shared/layout/appSidePanel';
import {
    createExpenseCall,
    updateExpenseCall,
    deleteExpenseCall,
} from '../../../api/expense/call';
import { ExpensesProps } from '../../../pages/expenses/index';
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
import {
    ExpenseForm,
    ExpenseFormActions,
    ExpenseFormInputs,
} from './expenseForm';

// ===================================================================
//                         Helper Functions
// ===================================================================
enum ExpenseAction {
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

// FIXME currently the ExpenseActionDrawer accepts a ton of props due to the
// "& ExpenseProps" line. We should clean this up and possibly move some of
// this logic up to pages/tag/index.tsx
type ExpenseActionDrawerProps = {
    actionHandler?: (action: ExpenseAction) => void;
    selectedExpense: Expense | undefined;
} & ExpensesProps;

/**
 * React component that renders a menu of buttons for interacting with tags.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {ExpenseActionDrawerProps} props - React properties for ExpenseActionDrawer
 * @returns {Element} a button with tag actions
 */
export default function ExpenseActionDrawer(
    props: ExpenseActionDrawerProps,
): JSX.Element {
    const [expanded, setExpanded] = React.useState<
        'new' | 'edit' | 'delete' | false
    >(false);

    const handleChange = (panel: 'new' | 'edit' | 'delete' | false) => (
        event: React.SyntheticEvent,
        newExpanded: boolean,
    ) => {
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
                    <Typography>Create Expense</Typography>
                </AccordionSummary>
                <ExpenseForm
                    initialState={{
                        name: '',
                        price: 0,
                        date: new Date(),
                        link: '',
                        tags: [],
                    }}
                    onSubmit={(formState) => {
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
                >
                    <AccordionDetails>
                        <ExpenseFormInputs />
                    </AccordionDetails>
                    <AccordionActions>
                        <ExpenseFormActions
                            onCancel={() => setExpanded(false)}
                        />
                    </AccordionActions>
                </ExpenseForm>
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
                    <Typography>Edit Expense</Typography>
                </AccordionSummary>
                <ExpenseForm
                    initialState={
                        props.selectedExpense != null
                            ? {
                                  name: props.selectedExpense.name,
                                  price: props.selectedExpense.cost,
                                  date: new Date(props.selectedExpense.date),
                                  link: props.selectedExpense.link,
                                  tags: props.selectedExpense.tags,
                              }
                            : {
                                  name: '',
                                  price: 0,
                                  date: new Date(),
                                  link: '',
                                  tags: [],
                              }
                    }
                    onSubmit={(formState) => {
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
                >
                    <AccordionDetails>
                        <Typography>
                            {props.selectedExpense
                                ? 'Selected Expense: ' +
                                  props.selectedExpense.name
                                : 'Please select an expense.'}
                        </Typography>
                        <ExpenseFormInputs />
                    </AccordionDetails>
                    <AccordionActions>
                        <ExpenseFormActions
                            onCancel={() => setExpanded(false)}
                        />
                    </AccordionActions>
                </ExpenseForm>
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
                    <Typography>Delete Expense</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.selectedExpense
                            ? 'Selected Expense: ' + props.selectedExpense.name
                            : 'Please select an expense.'}
                    </Typography>
                </AccordionDetails>
                <AccordionActions>
                    <Button onClick={() => console.log('FIXME')}>
                        FIXME Cancel
                    </Button>
                    <Button
                        disabled={props.selectedExpense == undefined}
                        onClick={() => {
                            if (props.selectedExpense) {
                                deleteExpenseCall({
                                    id: props.selectedExpense.id,
                                    headers: props.user.authHeaders,
                                }).then(
                                    (data) =>
                                        props.updateAllExpensesAction(data),
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
