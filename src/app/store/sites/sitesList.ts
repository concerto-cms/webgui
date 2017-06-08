import { request, reject, resolve } from 'redux-promised';
import {GET_SITES, GET_SITE, UPDATE_SITE, CREATE_SITE, DELETE_SITE} from '../actionTypes';
import { getIndexById } from '../../shared/arrayUtils';
import { containsType } from '../utils';

export interface ISitesListState {
    items: any[],
    isLoading: boolean,
    error?: any,
}

const getSitesList = (state, action) => {
    switch (action.type) {
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
const getSite = (state, action) => {
    const index = getIndexById(state.items, action.meta.id);
    let item = index !== null ? state.items[index] : {_id: action.meta.id};

    switch (action.type) {
        case request(GET_SITE):
            item.isLoading = true;
            break;
        case resolve(GET_SITE):
            item = Object.assign(action.payload, {
                isLoading: false,
            });
            item = action.payload;
            break;
        case reject(GET_SITE):
            item = Object.assign(item, {
                isLoading: false,
                error: action.error,
            });
            break;
        default:
            return state;
    }
    const newState = Object.assign({}, state);
    if (index === null) {
        newState.items.push(item);
    } else {
        newState.items[index] = item;
    }
    return newState;
};
const updateSite = (state, action) => {
    const index = getIndexById(state.items, action.meta.id);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case request(UPDATE_SITE):
            newState.items[index] = Object.assign({}, action.meta.site, {
                isLoading: true,
            });
            break;
        case resolve(UPDATE_SITE):
            newState.items[index] = Object.assign(action.payload.site, {
                isLoading: false,
            });
            break;
        case reject(UPDATE_SITE):
            newState.items[index] = Object.assign({}, action.meta.original);
            break;
        default:
            return state;
    }
    return newState;
};
const createSite = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case resolve(CREATE_SITE):
            newState.items = [action.payload.site, ...newState.items];
            break;
        default:
            return state;
    }
    return newState;
};
const deleteSite = (state, action) => {
    const index = getIndexById(state.items, action.meta.site._id);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case resolve(DELETE_SITE):
            newState.items.splice(index, 1);
            break;
        default:
            return state;
    }
    return newState;
};

export const sitesList = (state: ISitesListState, action): ISitesListState => {
    if (!state) {
        return {
            items: [],
            isLoading: false,
        }
    }
    if (containsType(action, GET_SITES)) {
        return getSitesList(state, action);
    }
    if (containsType(action, GET_SITE)) {
        return getSite(state, action);
    }
    if (containsType(action, UPDATE_SITE)) {
        return updateSite(state, action);
    }
    if (containsType(action, CREATE_SITE)) {
        return createSite(state, action);
    }
    if (containsType(action, DELETE_SITE)) {
        return deleteSite(state, action);
    }
    return state;
};
