import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/withAuthentication';
import PageLayout from '../../components/pageLayout';
import NavBreadcrumbs from '../../components/navBreadcrumbs';

const stateToProps = (state: RootState) => ({
    auth: {
        loggedIn: state.user.loggedIn,
    },
    ...state,
});
const connector = connect(stateToProps, {});

function Dashboard() {
    return (
        <PageLayout pageName='Dashboard'>
            <NavBreadcrumbs></NavBreadcrumbs>
            Here be dragons- default page
        </PageLayout>
    );
}

export default connector(withAuth(Dashboard));
