import { connect } from 'react-redux';
import ExpenseActionDrawer from '../../components/app/expenses/expenseActionDrawer';
import { createNewExpenseAction } from '../../redux/expenses/action';
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
};

export default connect(stateToProps, dispatchToProps)(ExpenseActionDrawer);
