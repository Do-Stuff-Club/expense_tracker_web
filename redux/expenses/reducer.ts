import {ExpenseAction, ExpenseActionTypes, ExpenseState } from "./types";

export const defaultExpenseState: ExpenseState = {
    expenses: [],
};

export default function expense(
    state = defaultExpenseState,
    action: ExpenseAction
): ExpenseState {
    console.log("In Expense Reducer!");
    switch (action.type) {
        case ExpenseActionTypes.CREATE_EXPENSE:
            return { expenses: [...state.expenses, action.payload.expense]};
        case ExpenseActionTypes.UPDATE_ALL_EXPENSES:
            return { expenses: action.payload.expenses };
        case ExpenseActionTypes.UPDATE_ONE_EXPENSE:
            // Replace the edited expense
            const newExpenses = state.expenses.map((expense) => {
                if (expense.id == action.payload.expense.id){
                    return action.payload.expense;
                } else {
                    return expense;
                }
            });
            return {expenses: newExpenses}
        default:
            return state;
    }   
}