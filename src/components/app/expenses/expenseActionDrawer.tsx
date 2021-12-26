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
    ExpenseFormState,
} from './expenseForm';
import {
    AllExpensesData,
    CreateExpenseParams,
    OneExpenseData,
    UpdateExpenseParams,
} from '../../../api/expense/types';

// ===================================================================
//                         Helper Functions
// ===================================================================

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

// Component props type
type ExpenseActionDrawerProps = {
    createNewExpenseAction: (
        data: CreateExpenseParams,
    ) => Promise<OneExpenseData | undefined>;
    updateExpenseAction: (
        data: UpdateExpenseParams,
    ) => Promise<OneExpenseData | undefined>;
    deleteExpenseAction: (id: number) => Promise<AllExpensesData | undefined>;

    selectedExpense: Expense | undefined;
};

/**
 * React component that renders a menu of buttons for interacting with tags.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {ExpenseActionDrawerProps} props - React properties for ExpenseActionDrawer
 * @returns {Element} a button with tag actions
 */
const ExpenseActionDrawer = (props: ExpenseActionDrawerProps): JSX.Element => {
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

    //#region button handlers
    /**
     * Handles new expense submission
     *
     * @param {ExpenseFormState} expenseFormState - Expense form
     */
    const onCreateExpenseSubmit = (
        expenseFormState: ExpenseFormState,
    ): void => {
        const { createNewExpenseAction } = props;

        createNewExpenseAction({
            name: expenseFormState.name,
            cost: expenseFormState.price,
            date: expenseFormState.date.toDateString(),
            link: expenseFormState.link,
            tags: expenseFormState.tags,
        });
    };

    /**
     * Handles update expense submission
     *
     * @param {ExpenseFormState} expenseFormState  - Expense form
     */
    const onEditExpenseSubmit = (expenseFormState: ExpenseFormState): void => {
        const { updateExpenseAction, selectedExpense } = props;

        if (selectedExpense) {
            updateExpenseAction({
                expense: {
                    id: selectedExpense.id,
                    name: expenseFormState.name,
                    cost: expenseFormState.price,
                    date: expenseFormState.date.toDateString(),
                    link: expenseFormState.link,
                    tags: expenseFormState.tags,
                },
            });
        }
    };

    /**
     * Handles delete expense button click
     *
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event - Click event
     */
    const onDeleteExpenseClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void => {
        event.preventDefault();

        const { deleteExpenseAction, selectedExpense } = props;

        // sanity check
        if (selectedExpense) {
            deleteExpenseAction(selectedExpense.id);
        }
    };
    //#endregion

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
                    onSubmit={onCreateExpenseSubmit}
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
                    onSubmit={onEditExpenseSubmit}
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
                        onClick={onDeleteExpenseClick}
                    >
                        Delete
                    </Button>
                </AccordionActions>
            </AppAccordion>
        </AppSidePanel>
    );
};

export default ExpenseActionDrawer;
