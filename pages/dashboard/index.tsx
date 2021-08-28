// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/withAuthentication';
import PageLayout from '../../components/pageLayout';
import NavBreadcrumbs from '../../components/navBreadcrumbs';

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
        <PageLayout pageName='Dashboard'>
            <NavBreadcrumbs></NavBreadcrumbs>
            Here be dragons- default page
        </PageLayout>
    );
}

export default connector(withAuth(Dashboard));
