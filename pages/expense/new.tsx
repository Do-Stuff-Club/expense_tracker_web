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
 * New Expense page component. Has a form for creating new expenses
 *
 * @returns {Element} Page element
 */
function NewExpense() {
    return <PageLayout pageName='Create Expense'>New Expense!</PageLayout>;
}

export default connector(withAuth(NewExpense));
