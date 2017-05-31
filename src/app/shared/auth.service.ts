import {Injectable} from '@angular/core';
import { auth } from '../../auth';

@Injectable()
export class AuthService {

  public logout(): void {
      auth.logout();
  }

  public getJWT() {
    return localStorage.getItem('id_token');
  }

  public getProfile() {
      return auth.getProfile();
  }

}
