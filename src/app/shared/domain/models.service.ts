import { Injectable } from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {ApiService} from '../api.service';
import {request, reject, resolve} from 'redux-promised';
import {GET_MODELS, SET_ACTIVE_MODEL, GET_MODEL, CREATE_MODEL, DELETE_MODEL} from '../../store/actionTypes';
import {IModelsState} from '../../store/models/index';
import {IAppState} from '../../store/index';
import {SitesService} from './sites.service';
import {Observable} from 'rxjs/Observable';
import {IModelsListState} from '../../store/models/modelsList';

@Injectable()
export class ModelsService {
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private api: ApiService,
        private sites: SitesService,
    ) {

    }
    getModels() {
        this.sites.getActiveSite().filter(site => !!site).first().subscribe(site => {
            const meta = {
                siteId: site._id,
            };
            this.ngRedux.dispatch({
                type: request(GET_MODELS),
                meta,
            });
            this.api.get(`/sites/${site._id}/models`)
                .map(result => {
                    return result.json();
                })
                .subscribe(
                    result => this.ngRedux.dispatch({
                        type: resolve(GET_MODELS),
                        payload: result,
                        meta,
                    }),
                    err => this.ngRedux.dispatch({
                        type: reject(GET_MODELS),
                        error: err,
                        meta,
                    })
                );

        });

        return this.getModelsStream();
    }
    getModelsStream() {
        return this.ngRedux
            .select('models')
            .map((state: IModelsState) => state.modelsList);


    }
    setActiveModel(id) {
        this.ngRedux.dispatch({
            type: SET_ACTIVE_MODEL,
            payload: id,
        });
        if (id) {
            this.getModel(id);
        }

    }
    getModel(id, siteId?) {
        this.ngRedux.dispatch({
            type: request(GET_MODEL),
            meta: {
                id,
                siteId,
            },
        });
        const performCall = (modelid, siteId) => {
            this.api.get(`/sites/${siteId}/models/${modelid}`)
                .map(result => {
                    return result.json();
                })
                .subscribe(
                    result => this.ngRedux.dispatch({
                        type: resolve(GET_MODEL),
                        meta: { id: modelid, siteId },
                        payload: result
                    }),
                    err => this.ngRedux.dispatch({
                        type: reject(GET_MODEL),
                        meta: { id: modelid, siteId },
                        error: err,
                    })
                );
        };
        if (siteId) {
            performCall(id, siteId);
        } else {

        }
        this.sites.getActiveSite().filter(site => !!site).first().subscribe(site => {
            performCall(id, site._id);
        });
        return this.ngRedux
            .select('models')
            .map((state: IModelsState) => state.modelsList.items)
            .map(items => {
                for (let model of items) {
                    if (model._id === id) {
                        return model;
                    }
                }
                return null;
            });
    }
    getActiveModel() {
        const $activeSiteId = this.ngRedux
            .select('models')
            .map((state: IModelsState) => state.activeModel);
        return Observable.combineLatest([$activeSiteId, this.getModelsStream()])
            .map((values) => {
                const id = values[0];
                const list: IModelsListState = values[1];
                for (let item of list.items) {
                    if (item._id === id) {
                        return item;
                    }
                }
                return null;
            })

    }
    createModel(model) {
        this.ngRedux.dispatch({
            type: request(CREATE_MODEL),
            meta: {
                model,
            },
        });
        return this.api.post(`/sites/${model.siteId}/models`, model)
            .then(result => result.json())
            .then(result => {
                this.ngRedux.dispatch({
                    type: resolve(CREATE_MODEL),
                    payload: {
                        model: result,
                    },
                    meta: {
                        model,
                    },
                });
                return result;
            })
            .catch(error => {
                this.ngRedux.dispatch({
                    type: reject(CREATE_MODEL),
                    error,
                    meta: {
                        model,
                    },
                });

            })
    }

    deleteModel(model) {
        this.ngRedux.dispatch({
            type: request(DELETE_MODEL),
            meta: {
                model,
            },
        });
        return this.api.delete(`/sites/${model.siteId}/models/${model._id}`)
            .then(result => {
                this.ngRedux.dispatch({
                    type: resolve(DELETE_MODEL),
                    meta: {
                        model,
                    },
                });
                return result;
            })
            .catch(error => {
                this.ngRedux.dispatch({
                    type: reject(DELETE_MODEL),
                    error,
                    meta: {
                        model,
                    },
                });

            })
    }
}
