import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {AuthService} from './auth.service';

import 'rxjs/add/operator/delay';

@Injectable()
export class ApiService {
  private baseUrl = 'http://web.api.docker/mgmt/v1';

  constructor(
    private http: Http,
    private auth: AuthService,
  ) {

  }
  get(url) {
    return this.http.get(this.baseUrl + url, {
      headers: this.getHeaders(),
    });

  }
  private getHeaders() {
    return new Headers({
      authorization: `bearer ${this.auth.getJWT()}`,
    });
  }
}
