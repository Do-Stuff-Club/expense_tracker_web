import { connect } from 'react-redux';
import ExpenseActionDrawer from '../../components/expenses/expenseActionDrawer';
import {
    createNewExpenseAction,
    deleteExpenseAction,
    updateExpenseAction,
} from '../../redux/expenses/action';
import { Expense } from '../../redux/expenses/types';
import { RootState } from '../../redux/store';

const stateToProps = (
    state: RootState,
    ownProps: { selectedExpense: Expense | undefined },
) => ({
    selectedExpense: ownProps.selectedExpense,
});

const dispatchToProps = {
    createNewExpenseAction,
    updateExpenseAction,
    deleteExpenseAction,
};

export default connect(stateToProps, dispatchToProps)(ExpenseActionDrawer);
