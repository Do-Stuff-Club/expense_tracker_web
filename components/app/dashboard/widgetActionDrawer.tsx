// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import EditWidgetDialog from './editWidgetDialog';
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
    WidgetForm,
    WidgetFormActions,
    WidgetFormInputs,
    WidgetFormState,
} from './widgetForm';
import {
    dateRangeStartEnd,
    toDateRange,
    todaysDate,
} from '../../../services/date.helper';
import { FormikProps } from 'formik';
import { queryExpensesCall } from '../../../api/expense/call';
import { DashboardProps } from '../../../pages/dashboard';
import { FormatShapesTwoTone } from '@mui/icons-material';
import { DateRange } from '../../../services/date.helper';

// ===================================================================
//                         Helper Functions
// ===================================================================
enum WidgetAction {
    CREATE = 'tag_action_panel_create',
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

// FIXME currently the WidgetActionDrawer accepts a ton of props due to the
// "& WidgetProps" line. We should clean this up and possibly move some of
// this logic up to pages/tag/index.tsx
type WidgetActionDrawerProps = {
    actionHandler?: (action: WidgetAction) => void;
    //selectedWidget: Widget | undefined;
} & DashboardProps;

/**
 * React component that renders a menu of buttons for interacting with tags.
 *
 * FIXME add a bit more detail as needed as you develop this
 *
 * @param {WidgetActionDrawerProps} props - React properties for WidgetActionDrawer
 * @returns {Element} a button with tag actions
 */
export default function WidgetActionDrawer(
    props: WidgetActionDrawerProps,
): JSX.Element {
    const [expanded, setExpanded] = React.useState<'new' | false>(false);

    const handleChange = (panel: 'new' | false) => (
        event: React.SyntheticEvent,
        newExpanded: boolean,
    ) => {
        console.log('Setting Expanded: ' + panel);
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
                    <Typography>Create Widget</Typography>
                </AccordionSummary>
                <WidgetForm
                    initialState={{
                        date_range_type: 'MTD',
                        start_date: todaysDate(),
                        end_date: todaysDate(),
                        tags: [],
                    }}
                    onSubmit={(formState) => {
                        const dateRange = toDateRange(
                            formState.date_range_type,
                            formState.start_date,
                            formState.end_date,
                        );
                        const { start, end } = dateRangeStartEnd(dateRange);
                        queryExpensesCall(props.user.id, {
                            start_date: start,
                            end_date: end,
                            tags: formState.tags,
                        }).then(
                            (data) => console.log(data),
                            (err) => console.log(err),
                        );
                    }}
                >
                    <AccordionDetails>
                        <WidgetFormInputs />
                    </AccordionDetails>
                    <AccordionActions>
                        <WidgetFormActions
                            onCancel={() => setExpanded(false)}
                        />
                    </AccordionActions>
                </WidgetForm>
            </AppAccordion>
        </AppSidePanel>
    );
}
