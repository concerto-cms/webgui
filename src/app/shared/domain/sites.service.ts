import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import {request, reject, resolve} from 'redux-promised';
import {GET_SITES, GET_SITE, SET_ACTIVE_SITE, UPDATE_SITE, CREATE_SITE, DELETE_SITE} from '../../store/actionTypes';
import {ISitesState} from '../../store/sites/index';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {ISitesListState} from '../../store/sites/sitesList';
import {getItemById} from '../arrayUtils';

@Injectable()
export class SitesService {
    constructor(
        private ngRedux: NgRedux<any>,
        private api: ApiService,
    ) {

    }

    getAvailableSites() {
        this.ngRedux.dispatch({
            type: request(GET_SITES)
        });
        this.api.get('/sites')
            .map(result => {
                return result.json();
            })
            .subscribe(
                result => this.ngRedux.dispatch({
                    type: resolve(GET_SITES),
                    payload: result
                }),
                err => this.ngRedux.dispatch({
                    type: reject(GET_SITES),
                    error: err,
                })
            );
        return this.getSitesListStream();
    }

    getSite(id) {
        this.ngRedux.dispatch({
            type: request(GET_SITE),
            meta: {
                id,
            },
        });
        this.api.get(`/sites/${id}`)
            .map(result => {
                return result.json();
            })
            .subscribe(
                result => this.ngRedux.dispatch({
                    type: resolve(GET_SITE),
                    meta: { id },
                    payload: result
                }),
                err => this.ngRedux.dispatch({
                    type: reject(GET_SITE),
                    meta: { id },
                    error: err,
                })
            );
        return this.ngRedux
            .select('sites')
            .map((state: ISitesState) => state.sitesList.items)
            .map(items => {
                for (let site of items) {
                    if (site._id === id) {
                        return site;
                    }
                }
                return null;
            });
    }
    getSitesListStream() {
        return this.ngRedux
            .select('sites')
            .map((state: ISitesState) => state.sitesList);
    }

    setActiveSite(id) {
        this.ngRedux.dispatch({
            type: SET_ACTIVE_SITE,
            payload: id,
        });
        if (id) {
            this.getSite(id);
        }
    }

    getActiveSite() {
        const $activeSiteId = this.ngRedux
            .select('sites')
            .map((state: ISitesState) => state.activeSite);
        return Observable.combineLatest([$activeSiteId, this.getSitesListStream()])
            .map((values) => {
                const id = values[0];
                const list: ISitesListState = values[1];
                for (let item of list.items) {
                    if (item._id === id) {
                        return item;
                    }
                }
                return null;
            })
    }
    updateSite(site) {
        const original = getItemById(this.ngRedux.getState().sites.sitesList.items, site._id);
        this.ngRedux.dispatch({
            type: request(UPDATE_SITE),
            meta: {
                site,
            },
        });
        return this.api.put(`/sites/${site._id}`, site)
            .then(result => result.json())
            .then(result => {
                this.ngRedux.dispatch({
                    type: resolve(UPDATE_SITE),
                    payload: {
                        site: result,
                    },
                    meta: {
                        id: site._id,
                        site,
                    },
                });
                return result;
            })
            .catch(error => {
                this.ngRedux.dispatch({
                    type: reject(UPDATE_SITE),
                    error,
                    meta: {
                        site,
                        original,
                    },
                });

            })
    }
    deleteSite(site) {
        this.ngRedux.dispatch({
            type: request(DELETE_SITE),
            meta: {
                site,
            },
        });
        return this.api.delete(`/sites/${site._id}`)
            .then(result => {
                this.ngRedux.dispatch({
                    type: resolve(DELETE_SITE),
                    meta: {
                        site,
                    },
                });
                return result;
            })
            .catch(error => {
                this.ngRedux.dispatch({
                    type: reject(DELETE_SITE),
                    error,
                    meta: {
                        site,
                    },
                });

            })
    }
    createSite(site) {
        this.ngRedux.dispatch({
            type: request(CREATE_SITE),
            meta: {
                site,
            },
        });
        return this.api.post(`/sites`, site)
            .then(result => result.json())
            .then(result => {
                this.ngRedux.dispatch({
                    type: resolve(CREATE_SITE),
                    payload: {
                        site: result,
                    },
                    meta: {
                        site,
                    },
                });
                return result;
            })
            .catch(error => {
                this.ngRedux.dispatch({
                    type: reject(CREATE_SITE),
                    error,
                    meta: {
                        site,
                    },
                });

            })
    }
}
