import { ExpenseAction, ExpenseActionTypes, ExpenseState } from './types';

export const defaultExpenseState: ExpenseState = {
    expenses: [],
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
        case ExpenseActionTypes.CREATE_EXPENSE:
            return { expenses: [...state.expenses, action.payload.expense] };
        case ExpenseActionTypes.UPDATE_ALL_EXPENSES:
            return { expenses: action.payload.expenses };
        case ExpenseActionTypes.UPDATE_ONE_EXPENSE:
            // Replace the edited expense
            return {
                expenses: state.expenses.map((expense) => {
                    if (expense.id == action.payload.expense.id) {
                        return action.payload.expense;
                    } else {
                        return expense;
                    }
                }),
            };
        default:
            return state;
    }
}
