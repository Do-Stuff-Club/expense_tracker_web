// ===================================================================
//                             Imports
// ===================================================================
import { Expense } from '../expenses/types';

// ===================================================================
//                              State
// ===================================================================
export interface DashboardState {
    selectedExpenses: ReadonlyArray<Expense>;
    loading: boolean;
}

// ===================================================================
//                             Actions
// ===================================================================
export enum DashboardActionTypes {
    QUERY_EXPENSES_INIT = 'QUERY_EXPENSES_INIT',
    QUERY_EXPENSES_SUCCESS = 'QUERY_EXPENSES_SUCCESS',
    QUERY_EXPENSES_FAIL = 'QUERY_EXPENSES_FAIL',
}

export type QueryExpensesAction =
    | {
          type: DashboardActionTypes.QUERY_EXPENSES_SUCCESS;
          payload: {
              expenses: readonly Expense[];
          };
      }
    | {
          type:
              | DashboardActionTypes.QUERY_EXPENSES_INIT
              | DashboardActionTypes.QUERY_EXPENSES_FAIL;
      };

export type DashboardAction = QueryExpensesAction;
