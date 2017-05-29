import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import {request, reject, resolve} from 'redux-promised';
import {GET_SITES, GET_SITE, SET_ACTIVE_SITE} from '../../store/actionTypes';
import {ISitesState} from '../../store/sites/index';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {ISitesListState} from '../../store/sites/sitesList';

@Injectable()
export class SitesService {
    constructor(private ngRedux: NgRedux<any>,
                private api: ApiService,) {

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
        return this.ngRedux
            .select('sites')
            .map((state: ISitesState) => state.sitesList);
    }

    getSite(id) {
        this.ngRedux.dispatch({
            type: request(GET_SITE)
        });
        this.api.get(`/sites/${id}`)
            .map(result => {
                return result.json();
            })
            .subscribe(
                result => this.ngRedux.dispatch({
                    type: resolve(GET_SITE),
                    payload: result
                }),
                err => this.ngRedux.dispatch({
                    type: reject(GET_SITE),
                    error: err,
                })
            );
        return this.getSitesListStream();
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
        })
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
}
