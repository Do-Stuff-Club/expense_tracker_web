// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/misc/withAuthentication';
import AppLayout from '../../components/layout/appLayout';
import { AppNavPage } from '../../components/nav/utils';
import { Box } from '@mui/material';
import PieChart from '../../components/dashboard/pieChart';

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

/**
 * Dashboard page component. Has helpful displays for various stats
 *
 * @returns {Element} Page element
 */
function Dashboard() {
    return (
        <AppLayout page={AppNavPage.DASHBOARD}>
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
