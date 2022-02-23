// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/misc/withAuthentication';
import AppLayout from '../../components/layout/appLayout';
import { AppNavPage } from '../../components/nav/utils';
import { Box } from '@mui/material';
<<<<<<< HEAD:pages/dashboard/index.tsx
import PieChart from '../../components/app/dashboard/pieChart';
import WidgetActionDrawer from '../../components/app/dashboard/widgetActionDrawer';
=======
import PieChart from '../../components/dashboard/pieChart';
>>>>>>> main:src/pages/dashboard/index.tsx

// ===================================================================
//                            Component
// ===================================================================
const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});
const connector = connect(stateToProps, {});
type ReduxProps = ConnectedProps<typeof connector>;
export type DashboardProps = ReduxProps;

/**
 * Dashboard page component. Has helpful displays for various stats
 *
 * @param {DashboardProps} props - Props from Redux state
 * @returns {Element} Page element
 */
function Dashboard(props: DashboardProps) {
    return (
        <AppLayout page={AppNavPage.DASHBOARD}>
            <WidgetActionDrawer {...props} />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <PieChart
                    labels={['Red', 'Blue', 'Yellow']}
                    values={[300, 50, 100]}
                    colors={[
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                    ]}
                    height={'150px'}
                    width={'150px'}
                ></PieChart>
            </Box>
        </AppLayout>
    );
}

export default connector(withAuth(Dashboard));
