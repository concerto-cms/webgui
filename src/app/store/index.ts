import { combineReducers } from 'redux';
import {sites, ISitesState} from './sites';
import {models, IModelsState} from './models/index';
import {content, IContentState} from './content/index';
export interface IAppState {
     sites: ISitesState,
    models: IModelsState,
    content: IContentState,
}

export const rootReducer = combineReducers({
    sites,
    models,
    content,
});
