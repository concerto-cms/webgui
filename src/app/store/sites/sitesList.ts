import { request, reject, resolve } from 'redux-promised';
import {GET_SITES, GET_SITE} from '../actionTypes';

export interface ISitesListState {
    items: any[],
    isLoading: boolean,
    error?: any,
}

const containsType = (action, type) => {
    return [request(type), reject(type), resolve(type)].includes(action.type);
};
const getIndexById = (list, id) => {
    console.log(list, id);
    for (let item of list) {
        if (item._id === id) {
            return list.indexOf(item);
        }
    }
    return null;
};
const handleGetSitesList = (state, action) => {
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
const handleGetSite = (state, action) => {
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

export const sitesList = (state: ISitesListState, action): ISitesListState => {
    if (!state) {
        return {
            items: [],
            isLoading: false,
        }
    }
    if (containsType(action, GET_SITES)) {
        return handleGetSitesList(state, action);
    }
    if (containsType(action, GET_SITE)) {
        return handleGetSite(state, action);
    }
    return state;
};
