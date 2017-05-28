import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import auth0 from 'auth0-js';

/**
 * @todo use webpack to inject configuration
 * @type {{clientID: string; domain: string; callbackURL: string}}
 */
export const AUTH_CONFIG = {
  clientID: 'haJL6bii64RjVYaLpWiOcBOkhOUmmam9',
  domain: 'concerto.eu.auth0.com',
  callbackURL: 'http://localhost:3000/'
};

@Injectable()
export class AuthService {
  auth0;

  constructor(public router: Router) {
    this.auth0 = new auth0.WebAuth({
      clientID: AUTH_CONFIG.clientID,
      domain: AUTH_CONFIG.domain,

      responseType: 'token id_token',
//          audience: 'https://concerto.eu.auth0.com/userinfo',
      redirectUri: AUTH_CONFIG.callbackURL,
      scope: 'openid profile eail'
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.logout();
        console.log(err);
        this.router.navigate(['/']);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getJWT() {
    return localStorage.getItem('id_token');
  }

}
