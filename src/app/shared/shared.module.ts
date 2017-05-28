import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AuthService } from './auth.service';
import { SitesService } from './domain/sites.service';
import { ApiService } from './api.service';
import {NgRedux, NgReduxModule, DevToolsExtension} from '@angular-redux/store';
import { rootReducer } from '../store';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgReduxModule,
  ],
  declarations: [],
  exports: [SharedRoutingModule],
  providers: [ApiService, AuthService, SitesService]
})
export class SharedModule {
  constructor(
    ngRedux: NgRedux<any>,
    devTools: DevToolsExtension,
    auth: AuthService,
  ) {
    auth.handleAuthentication();
    if (!auth.isAuthenticated()) {
      auth.login();
    }
    ngRedux.configureStore(rootReducer, {}, [
        createLogger({ level: 'info', collapsed: false }),
        thunk,
      ],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);
  }
}
