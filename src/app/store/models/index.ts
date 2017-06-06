import { combineReducers } from 'redux';
import {IModelsListState, modelsList} from './modelsList';

export interface IModelsState {
    modelsList: IModelsListState,
}

export const models = combineReducers({
    modelsList
});
