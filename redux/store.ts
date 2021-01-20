import {
  createStore,
  AnyAction,
  applyMiddleware,
  combineReducers,
} from "redux";
import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import user, { defaultUserState } from "./user/reducer";
import { UserAction, UserActionTypes, UserState } from "./user/types";
import App from "next/app";
import { TagAction } from "./tags/types";
import tag, { defaultTagState } from "./tags/reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const defaultState = { user: defaultUserState, tag: defaultTagState };

type HydrateAction = {
  type: typeof HYDRATE;
  payload: RootState;
};

type AppAction = HydrateAction | UserAction | TagAction;

const combinedReducer = combineReducers({ user, tag });
export type RootState = ReturnType<typeof combinedReducer>;

// create your reducer
const rootReducer = (state: RootState = defaultState, action: AppAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("In Hydrate");
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    default:
      // Replace auth token on each request
      if (
        state.user.loggedIn &&
        action.payload.authHeaders["access-token"] != "" // Only replace if access-token is not empty- that indicates batch mode
      ) {
        const stateWithAuth: RootState = {
          ...state,
          user: {
            ...state.user,
            authHeaders: action.payload.authHeaders,
          },
        };
        return combinedReducer(stateWithAuth, action);
      } else return combinedReducer(state, action);
  }
};

// create a makeStore function
const makeStore: MakeStore<RootState, AppAction> = (context: Context) =>
  createStore(rootReducer, composedEnhancer);

// export an assembled wrapper
export const wrapper = createWrapper<RootState, AppAction>(makeStore, {
  debug: true,
});
