import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { auth } from './auth';

if (environment.production) {
  enableProdMode();
}

auth.handleAuthentication().then(() => {
    if (auth.isAuthenticated()) {
        platformBrowserDynamic().bootstrapModule(AppModule);
    }
    else {
        auth.login();
    }
}).catch(err => console.error(err));
