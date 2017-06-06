import {SET_ACTIVE_MODEL} from '../actionTypes';

export const activeModel = (state: string, action): string => {
    if (state === undefined) {
        return '';
    }
    switch(action.type) {
        case (SET_ACTIVE_MODEL):
            return action.payload;
        default:
            return state;
    }
};
