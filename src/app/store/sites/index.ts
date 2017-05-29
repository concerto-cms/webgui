import { combineReducers } from 'redux';
import { sitesList, ISitesListState } from './sitesList';
import { activeSite } from './activeSite';

export interface ISitesState {
    sitesList: ISitesListState,
    activeSite: string,
}

export const sites = combineReducers({
    sitesList,
    activeSite,
});
