import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {AuthService} from './auth.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  private baseUrl = 'http://web.api.docker/mgmt/v1';

  constructor(
    private http: Http,
    private auth: AuthService,
  ) {

  }
  get(url) {
    return this.http
        .get(this.baseUrl + url, {
          headers: this.getHeaders(),
        });

  }
  put(url, content) {
      return this.http
          .put(this.baseUrl + url, content, {
              headers: this.getHeaders(),
          }).toPromise();
  }
  post(url, content) {
      return this.http
          .post(this.baseUrl + url, content, {
              headers: this.getHeaders(),
          }).toPromise();
  }
  delete(url) {
      return this.http
          .delete(this.baseUrl + url, {
              headers: this.getHeaders(),
          }).toPromise();
  }
  private getHeaders() {
    return new Headers({
      authorization: `bearer ${this.auth.getJWT()}`,
    });
  }
}
