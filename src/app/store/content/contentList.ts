import { request, reject, resolve } from 'redux-promised';
import {GET_CONTENT, CREATE_CONTENT, GET_CONTENT_ITEM, UPDATE_CONTENT} from '../actionTypes';
import {containsType} from '../utils';
import {getIndexById} from '../../shared/arrayUtils';

export interface IContentListState {
    items: any[],
    siteId: string,
    isLoading: boolean,
    error?: any,
}
const createContentItem = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case resolve(CREATE_CONTENT):
            newState.items = [action.payload.item, ...newState.items];
            break;
        default:
            return state;
    }
    return newState;
};
const getContent = (state, action) => {
    let newState = Object.assign({}, state, {
    });
    switch (action.type) {
        case request(GET_CONTENT):
            newState.isLoading = true;
            if (newState.siteId !== action.meta.siteId) {
                newState = Object.assign(newState, {
                    items: [],
                    siteId: action.meta.siteId,
                })
            }
            return newState;
        case resolve(GET_CONTENT):
            newState.isLoading = false;
            newState = Object.assign(newState, {
                items: action.payload,
                siteId: action.meta.siteId,
            });
            return newState;
        case reject(GET_CONTENT):
            newState.isLoading = false;
            newState = Object.assign(newState, {
                error: action.error,
                siteId: action.meta.siteId,
            });
            return newState;
    }
};
const getContentItem = (state, action) => {
    const index = getIndexById(state.items, action.meta.id);
    let item = index !== null ? state.items[index] : {_id: action.meta.id};

    switch (action.type) {
        case request(GET_CONTENT_ITEM):
            item.isLoading = true;
            break;
        case resolve(GET_CONTENT_ITEM):
            item = Object.assign(action.payload, {
                isLoading: false,
            });
            item = action.payload;
            break;
        case reject(GET_CONTENT_ITEM):
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
const updateContent = (state, action) => {
    const index = getIndexById(state.items, action.meta.id);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case request(UPDATE_CONTENT):
            newState.items[index] = Object.assign({}, action.meta.item, {
                isLoading: true,
            });
            break;
        case resolve(UPDATE_CONTENT):
            newState.items[index] = Object.assign(action.payload.item, {
                isLoading: false,
            });
            break;
        case reject(UPDATE_CONTENT):
            newState.items[index] = Object.assign({}, action.meta.original);
            break;
        default:
            return state;
    }
    return newState;
};
export const contentList = (state: IContentListState, action): IContentListState => {
    if (!state) {
        return {
            items: [],
            siteId: null,
            isLoading: false,
        }
    }
    if (containsType(action, GET_CONTENT)) {
        return getContent(state, action);
    }
    if (containsType(action, GET_CONTENT_ITEM)) {
        return getContentItem(state, action);
    }
    if (containsType(action, CREATE_CONTENT)) {
        return createContentItem(state, action);
    }
    if (containsType(action, UPDATE_CONTENT)) {
        return updateContent(state, action);
    }

    return state;
};
