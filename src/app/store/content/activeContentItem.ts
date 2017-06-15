import {SET_ACTIVE_CONTENTITEM} from '../actionTypes';

export const activeContentItem = (state: string, action): string => {
    if (state === undefined) {
        return '';
    }
    switch(action.type) {
        case (SET_ACTIVE_CONTENTITEM):
            return action.payload;
        default:
            return state;
    }
};
