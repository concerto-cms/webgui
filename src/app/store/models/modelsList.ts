import { request, reject, resolve } from 'redux-promised';
import {GET_MODELS, CREATE_MODEL} from '../actionTypes';
import {containsType} from '../utils';

export interface IModelsListState {
    items: any[],
    siteId: string,
    isLoading: boolean,
    error?: any,
}
const createModel = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case resolve(CREATE_MODEL):
            newState.items = [action.payload.model, ...newState.items];
            break;
        default:
            return state;
    }
    return newState;
};
const getModels = (state, action) => {
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
};
export const modelsList = (state: IModelsListState, action): IModelsListState => {
    if (!state) {
        return {
            items: [],
            siteId: null,
            isLoading: false,
        }
    }
    if (containsType(action, GET_MODELS)) {
        return getModels(state, action);
    }
    if (containsType(action, CREATE_MODEL)) {
        return createModel(state, action);
    }

    return state;
};
