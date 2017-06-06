import { combineReducers } from 'redux';
import {sites, ISitesState} from './sites';
import {models, IModelsState} from './models/index';
export interface IAppState {
     sites: ISitesState,
    models: IModelsState
}

export const rootReducer = combineReducers({
    sites,
    models,
});
