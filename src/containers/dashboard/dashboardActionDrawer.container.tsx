// ===================================================================
//                             Imports
// ===================================================================
import { connect } from 'react-redux';
import DashboardActionDrawer from '../../components/dashboard/dashboardActionDrawer';
import { queryExpensesAction } from '../../redux/dashboard/action';
import { RootState } from '../../redux/store';
// ===================================================================
//                             Container
// ===================================================================
const stateToProps = (state: RootState) => ({
    selectedExpenses: state.dashboard.selectedExpenses,
    user_id: state.user.user.id,
});

const dispatchToProps = {
    queryExpensesAction,
};

export default connect(stateToProps, dispatchToProps)(DashboardActionDrawer);
