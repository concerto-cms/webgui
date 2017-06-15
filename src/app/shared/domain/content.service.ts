import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {ApiService} from '../api.service';
import {SitesService} from './sites.service';
import {request, reject, resolve} from 'redux-promised';
import {
    CREATE_CONTENT, GET_CONTENT, SET_ACTIVE_CONTENTITEM, GET_CONTENT_ITEM,
    UPDATE_CONTENT
} from '../../store/actionTypes';
import {IContentState} from '../../store/content/index';
import {Observable} from 'rxjs/Observable';
import {IContentListState} from '../../store/content/contentList';
import {getItemById} from '../arrayUtils';

@Injectable()
export class ContentService {

    constructor(private ngRedux: NgRedux<any>,
                private api: ApiService,
                private sites: SitesService,
    ) {

    }

    getContent() {
        this.sites.getActiveSite().filter(site => !!site).first().subscribe(site => {
            const meta = {
                siteId: site._id,
            };
            this.ngRedux.dispatch({
                type: request(GET_CONTENT),
                meta,
            });
            this.api.get(`/sites/${site._id}/content`)
                .map(result => {
                    return result.json();
                })
                .subscribe(
                    result => this.ngRedux.dispatch({
                        type: resolve(GET_CONTENT),
                        payload: result,
                        meta,
                    }),
                    err => this.ngRedux.dispatch({
                        type: reject(GET_CONTENT),
                        error: err,
                        meta,
                    })
                );

        });

        return this.getContentStream();
    }

    getContentStream() {
        return this.ngRedux
            .select('content')
            .map((state: IContentState) => state.contentList);
    }

    createItem(item) {
        this.ngRedux.dispatch({
            type: request(CREATE_CONTENT),
            meta: {
                item,
            },
        });
        return this.api.post(`/sites/${item.siteId}/content`, item)
            .then(result => result.json())
            .then(result => {
                this.ngRedux.dispatch({
                    type: resolve(CREATE_CONTENT),
                    payload: {
                        item: result,
                    },
                    meta: {
                        item,
                    },
                });
                return result;
            })
            .catch(error => {
                this.ngRedux.dispatch({
                    type: reject(CREATE_CONTENT),
                    error,
                    meta: {
                        item,
                    },
                });

            })
    }
    getContentItem(id) {
        this.ngRedux.dispatch({
            type: request(GET_CONTENT_ITEM),
            meta: {
                id,
            },
        });
        this.sites.getActiveSite().filter(site => !!site).first().subscribe(site => {
            this.api.get(`/sites/${site._id}/content/${id}`)
                .map(result => {
                    return result.json();
                })
                .subscribe(
                    result => this.ngRedux.dispatch({
                        type: resolve(GET_CONTENT_ITEM),
                        meta: { id },
                        payload: result
                    }),
                    err => this.ngRedux.dispatch({
                        type: reject(GET_CONTENT_ITEM),
                        meta: { id },
                        error: err,
                    })
                );
        });
        return this.ngRedux
            .select('sites')
            .map((state: IContentState) => state.contentList.items)
            .map(items => {
                for (let model of items) {
                    if (model._id === id) {
                        return model;
                    }
                }
                return null;
            });
    }
    setActiveContentItem(id) {
        this.ngRedux.dispatch({
            type: SET_ACTIVE_CONTENTITEM,
            payload: id,
        });
        if (id) {
            this.getContentItem(id);
        }

    }
    getActiveContentItem() {
        const $activeSiteId = this.ngRedux
            .select('content')
            .map((state: IContentState) => state.activeContentItem);
        return Observable.combineLatest([$activeSiteId, this.getContentStream()])
            .map((values) => {
                const id = values[0];
                const list: IContentListState = values[1];
                for (let item of list.items) {
                    if (item._id === id) {
                        return item;
                    }
                }
                return null;
            })


    }
    updateContentItem(item) {
        const original = getItemById(this.ngRedux.getState().content.contentList.items, item._id);
        this.ngRedux.dispatch({
            type: request(UPDATE_CONTENT),
            meta: {
                id: item._id,
                item,
            },
        });
        return this.api.put(`/sites/${item.siteId}/content/${item._id}`, item)
            .then(result => result.json())
            .then(result => {
                this.ngRedux.dispatch({
                    type: resolve(UPDATE_CONTENT),
                    meta: { item, id: item._id },
                    payload: {item: result}
                });
                return result;
            })
            .catch(error => {
                this.ngRedux.dispatch({
                    type: reject(UPDATE_CONTENT),
                    meta: { item, original },
                    error,
                })
            });

    }
}
