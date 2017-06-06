import { combineReducers } from 'redux';
import {IModelsListState, modelsList} from './modelsList';
import { activeModel } from './activeModel';

export interface IModelsState {
    modelsList: IModelsListState,
    activeModel: string,
}

export const models = combineReducers({
    modelsList,
    activeModel,
});
