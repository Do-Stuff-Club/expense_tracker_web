import { createStore, applyMiddleware, combineReducers } from 'redux';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import user, { defaultUserState } from './user/reducer';
import { UserAction } from './user/types';
import { TagAction } from './tags/types';
import { ExpenseAction } from './expenses/types';
import expense, { defaultExpenseState } from './expenses/reducer';
import tag from './tags/reducer';
import { defaultTagState } from './tags/state';
import dashboard, { defaultDashboardState } from './dashboard/reducer';
import { DashboardAction } from './dashboard/types';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const defaultState = {
    user: defaultUserState,
    tag: defaultTagState,
    expense: defaultExpenseState,
    dashboard: defaultDashboardState,
};

type HydrateAction = {
    type: typeof HYDRATE;
    payload: RootState;
};

type AppAction =
    | HydrateAction
    | UserAction
    | TagAction
    | ExpenseAction
    | DashboardAction;

const combinedReducer = combineReducers({ user, tag, expense, dashboard });
export type RootState = ReturnType<typeof combinedReducer>;

// create your reducer
const rootReducer = (state: RootState = defaultState, action: AppAction) => {
    switch (action.type) {
        case HYDRATE:
            console.log('In Hydrate');
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return { ...state, ...action.payload };
        default:
            return combinedReducer(state, action);
    }
};

// create a makeStore function
const makeStore: MakeStore<RootState, AppAction> = () =>
    createStore(rootReducer, composedEnhancer);

// export an assembled wrapper
export const wrapper = createWrapper<RootState, AppAction>(makeStore, {
    debug: true,
});
