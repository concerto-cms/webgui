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
let profile = null;

export class AuthService {
    auth0;

    constructor(config) {
        this.auth0 = new auth0.WebAuth({
            clientID: config.clientID,
            domain: config.domain,

            responseType: 'token id_token',
//          audience: 'https://concerto.eu.auth0.com/userinfo',
            redirectUri: config.callbackURL,
            scope: 'openid profile eail'
        });
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    window.location.hash = '';
                    this.setSession(authResult);
                    resolve(authResult);
                } else if (err) {
                    console.error(err);
                    this.logout();
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private setSession(authResult): void {
        profile = authResult.idTokenPayload;
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        profile = null;
        // Go back to the home route
        this.login();
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        profile = JSON.parse(localStorage.getItem('profile'));
        console.log("isAuthenticated", (new Date().getTime() < expiresAt));

        return new Date().getTime() < expiresAt;
    }

    public getJWT() {
        return localStorage.getItem('id_token');
    }

    public getProfile() {
        return profile;
    }

}

export const auth = new AuthService(AUTH_CONFIG);
