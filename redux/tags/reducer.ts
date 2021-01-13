import { RootState } from '../store';
import { defaultUserState } from '../user/reducer';
import { TagAction, TagActionTypes, TagState } from './types';

export const defaultTagState: TagState = {
    categories: []
}

export default function tag(state = defaultTagState, action: TagAction): TagState {
    switch (action.type) {
        case TagActionTypes.FETCH:
            return action.payload.tags
        default:
            return state
    }
}