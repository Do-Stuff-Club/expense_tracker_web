// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/app/shared/withAuthentication';
import AppLayout from '../../components/app/shared/layout/appLayout';
import { AppNavPage } from '../../components/app/shared/nav/utils';

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
    return <AppLayout page={AppNavPage.DASHBOARD}>HELLOOOO</AppLayout>;
}

export default connector(withAuth(Dashboard));
