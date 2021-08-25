// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux/store';
import withAuth from '../../components/withAuthentication';
import PageLayout from '../../components/pageLayout';

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
 * Expense Index page component. Displays all expenses. Has links for creating and editing expenses.
 *
 * @returns {Element} Page element
 */
function Expenses() {
    return <PageLayout pageName='Expenses'>Here be dragons</PageLayout>;
}

export default connector(withAuth(Expenses));
