import {SET_ACTIVE_SITE} from '../actionTypes';

export const activeSite = (state: string, action): string => {
    if (state === undefined) {
        return '';
    }
    switch(action.type) {
        case (SET_ACTIVE_SITE):
            return action.payload;
        default:
            return state;
    }
};
