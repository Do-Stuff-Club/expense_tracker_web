// ===================================================================
//                             Imports
// ===================================================================
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/misc/withAuthentication';
import AppLayout from '../../components/layout/appLayout';
import { AppNavPage } from '../../components/nav/utils';
import { Box } from '@mui/material';
import PieChart from '../../components/dashboard/pieChart';
import DashboardActionDrawer from '../../containers/dashboard/dashboardActionDrawer.container';
import { getExpensesAction } from '../../redux/expenses/action';
import { getAllTagsAction } from '../../redux/tags/action';

// ===================================================================
//                            Component
// ===================================================================
const stateToProps = (state: RootState) => ({
    userId: state.user.user.id,
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});

const dispatchToProps = {
    getAllTagsAction,
    getExpensesAction,
};
const connector = connect(stateToProps, dispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export type DashboardProps = ReduxProps;

/**
 * Dashboard page component. Has helpful displays for various stats
 *
 * @param {DashboardProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function Dashboard(props: DashboardProps) {
    useEffect(() => {
        const { getAllTagsAction, getExpensesAction, userId } = props;
        // get all tags
        getAllTagsAction();
        // get user's expenses
        getExpensesAction(userId);
    }, []); // Pass an empty array so it only fires once
    return (
        <AppLayout page={AppNavPage.DASHBOARD}>
            <DashboardActionDrawer />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <PieChart
                    tags={props.tag.rootIds.map((id) => props.tag.map[id])}
                    expenses={props.expense.expenses}
                    tagState={props.tag}
                    height={'250px'}
                    width={'250px'}
                ></PieChart>
            </Box>
        </AppLayout>
    );
}

export default connector(withAuth(Dashboard));
