import { ExpenseAction, ExpenseActionTypes, ExpenseState } from './types';

export const defaultExpenseState: ExpenseState = {
    expenses: [],
    loading: false,
};

/**
 * Redux reducer for expense slice. Actions include:
 * FIXME
 *
 * @param {ExpenseState} state - the current tag state in the Redux store
 * @param {ExpenseAction} action - the action object to execute
 * @returns {ExpenseState} the new expense state
 */
export default function expense(
    state = defaultExpenseState,
    action: ExpenseAction,
): ExpenseState {
    console.log('In Expense Reducer!');
    switch (action.type) {
        case ExpenseActionTypes.GET_EXPENSES_INIT:
            return { ...state, loading: true };
        case ExpenseActionTypes.GET_EXPENSES_SUCCESS:
            return {
                ...state,
                expenses: action.payload.expenses,
                loading: false,
            };
        case ExpenseActionTypes.GET_EXPENSES_FAIL:
            return { ...state, loading: false };

        case ExpenseActionTypes.CREATE_EXPENSE_INIT:
            return { ...state, loading: true };
        case ExpenseActionTypes.CREATE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: [...state.expenses, action.payload.expense],
                loading: false,
            };
        case ExpenseActionTypes.CREATE_EXPENSE_FAIL:
            return { ...state, loading: false };

        case ExpenseActionTypes.UPDATE_EXPENSE_INIT:
            return { ...state, loading: true };
        case ExpenseActionTypes.UPDATE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: state.expenses.map((c) =>
                    c.id === action.payload.expense.id
                        ? action.payload.expense
                        : c,
                ),
                loading: false,
            };
        case ExpenseActionTypes.UPDATE_EXPENSE_FAIL:
            return { ...state, loading: false };

        case ExpenseActionTypes.DELETE_EXPENSE_INIT:
            return { ...state, loading: true };
        case ExpenseActionTypes.DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: action.payload.expenses,
                loading: false,
            };
        case ExpenseActionTypes.DELETE_EXPENSE_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}
