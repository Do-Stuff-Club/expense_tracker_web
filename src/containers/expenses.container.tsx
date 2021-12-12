import { connect } from 'react-redux';
import withAuth from '../components/app/shared/withAuthentication';
import Expenses from '../components/app/expenses/expenses.component';
import {
    createExpenseAction,
    updateAllExpensesAction,
    updateOneExpenseAction,
} from '../redux/expenses/action';
import { RootState } from '../redux/store';
import { fetchTagsAction } from '../redux/tags/action';

const stateToProps = (state: RootState) => ({
    expenses: state.expense.expenses,
});

const dispatchToProps = {
    createExpenseAction,
    updateAllExpensesAction,
    updateOneExpenseAction,
    fetchTagsAction,
};

export default connect(stateToProps, dispatchToProps)(withAuth(Expenses));

//TODO: need to create INIT actions
