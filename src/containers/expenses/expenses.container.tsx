// ===================================================================
//                             Imports
// ===================================================================
import { connect } from 'react-redux';

import withAuth from '../../components/misc/withAuthentication';
import Expenses from '../../components/expenses/expenses.component';

import { RootState } from '../../redux/store';
import { getAllTagsAction } from '../../redux/tags/action';
import { getExpensesAction } from '../../redux/expenses/action';

// ===================================================================
//                             Container
// ===================================================================
const stateToProps = (state: RootState) => ({
    expenses: state.expense.expenses,
    userId: state.user.id,
});

const dispatchToProps = {
    getAllTagsAction,
    getExpensesAction,
};

export default connect(stateToProps, dispatchToProps)(withAuth(Expenses));
