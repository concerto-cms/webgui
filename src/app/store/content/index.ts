import { combineReducers } from 'redux';
import {IContentListState, contentList} from './contentList';
import { activeContentItem } from './activeContentItem';

export interface IContentState {
    contentList: IContentListState,
    activeContentItem: string,
}

export const content = combineReducers({
    contentList,
    activeContentItem,
});
