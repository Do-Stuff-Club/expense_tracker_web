import { DashboardActionTypes, DashboardAction, DashboardState } from './types';

export const defaultDashboardState: DashboardState = {
    selectedExpenses: [],
    loading: false,
};

export default function dashboard(
    state = defaultDashboardState,
    action: DashboardAction,
): DashboardState {
    switch (action.type) {
        case DashboardActionTypes.QUERY_EXPENSES_INIT:
            return { ...state, loading: true };
        case DashboardActionTypes.QUERY_EXPENSES_SUCCESS:
            return {
                ...state,
                selectedExpenses: action.payload.expenses,
                loading: false,
            };
        case DashboardActionTypes.QUERY_EXPENSES_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}
