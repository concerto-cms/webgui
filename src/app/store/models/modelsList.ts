import { request, reject, resolve } from 'redux-promised';
import {GET_MODELS, CREATE_MODEL, UPDATE_MODEL} from '../actionTypes';
import {containsType} from '../utils';
import {getIndexById} from '../../shared/arrayUtils';

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
const updateModel = (state, action) => {
    const index = getIndexById(state.items, action.meta.id);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case request(UPDATE_MODEL):
            newState.items[index] = Object.assign({}, action.meta.model, {
                isLoading: true,
            });
            break;
        case resolve(UPDATE_MODEL):
            newState.items[index] = Object.assign(action.payload.model, {
                isLoading: false,
            });
            break;
        case reject(UPDATE_MODEL):
            newState.items[index] = Object.assign({}, action.meta.original);
            break;
        default:
            return state;
    }
    return newState;
}
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
    if (containsType(action, UPDATE_MODEL)) {
        return updateModel(state, action);
    }

    return state;
};
