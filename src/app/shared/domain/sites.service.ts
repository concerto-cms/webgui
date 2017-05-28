import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import { request, reject, resolve } from 'redux-promised';
import {GET_SITES} from '../../store/actionTypes';
import {ISitesState} from '../../store/sites/index';
import {ApiService} from '../api.service';

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
    return this.ngRedux
      .select('sites')
      .map((state: ISitesState) => state.sitesList);
  }
}
