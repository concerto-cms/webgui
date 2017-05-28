import { request, reject, resolve } from 'redux-promised';
import {GET_SITES} from '../actionTypes';

export interface ISitesListState {
    items: any[],
    isLoading: boolean,
    error?: any,
}

export const sitesList = (state: ISitesListState, action): ISitesListState => {
    if (!state) {
        return {
            items: [],
            isLoading: false,
        }
    }
    switch(action.type) {
        case request(GET_SITES):
            return Object.assign({}, state, {
                isLoading: true
            });
        case resolve(GET_SITES): {
            return {
                items: action.payload,
                isLoading: false,
            }
        }
        case reject(GET_SITES): {
            return {
                items: [],
                isLoading: false,
                error: action.error,
            }
        }
        default:
            return state;
    }
};
