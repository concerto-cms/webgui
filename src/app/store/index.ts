import { combineReducers } from 'redux';
import {sites, ISitesState} from './sites';
export interface IAppState {
     sites: ISitesState
}

export const rootReducer = combineReducers({
    sites
});
