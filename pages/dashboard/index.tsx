// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/withAuthentication';
import { NavPage } from '../../components/appHeader';
import AppLayout from '../../components/appLayout';

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
    return <AppLayout page={NavPage.DASHBOARD}>HELLOOOO</AppLayout>;
}

export default connector(withAuth(Dashboard));
