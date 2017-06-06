import { Injectable } from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {ApiService} from '../api.service';
import {request, reject, resolve} from 'redux-promised';
import {GET_MODELS} from '../../store/actionTypes';
import {IModelsState} from '../../store/models/index';
import {IAppState} from '../../store/index';
import {SitesService} from './sites.service';

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

        return this.ngRedux
            .select('models')
            .map((state: IModelsState) => state.modelsList);

    }
}
