import { request, reject, resolve } from 'redux-promised';
import {GET_MODELS} from '../actionTypes';

export interface IModelsListState {
    items: any[],
    siteId: string,
    isLoading: boolean,
    error?: any,
}

export const modelsList = (state: IModelsListState, action): IModelsListState => {
    if (!state) {
        return {
            items: [],
            siteId: '',
            isLoading: false,
        }
    }
    let newState = Object.assign({}, state, {
    });
    switch (action.type) {
        case request(GET_MODELS):
            newState.isLoading = true;
            if (newState.siteId !== action.meta.siteId) {
                newState = Object.assign(newState, {
                    items: [],
                    siteId: action.meta.siteId,
                })
            }
            return newState;
        case resolve(GET_MODELS):
            newState.isLoading = false;
                newState = Object.assign(newState, {
                    items: action.payload,
                    siteId: action.meta.siteId,
                });
            return newState;
        case reject(GET_MODELS):
            newState.isLoading = false;
            newState = Object.assign(newState, {
                error: action.error,
                siteId: action.meta.siteId,
            });
            return newState;
    }
    return state;
};
