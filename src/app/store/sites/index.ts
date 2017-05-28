import {combineReducers} from 'redux';
import { sitesList, ISitesListState } from './sitesList';

export interface ISitesState {
    sitesList: ISitesListState
}

export const sites = combineReducers({
    sitesList
});
