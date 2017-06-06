import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {SitesModule} from './sites/sites.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdListModule} from '@angular/material';

import 'hammerjs';
import {NgRedux, NgReduxModule, DevToolsExtension} from '@angular-redux/store';
import {rootReducer} from './store';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import 'rxjs/add/operator/debounce';
import {ManageModule} from './manage/manage.module';
import {EditModule} from './edit/edit.module';
import {DevelopModule} from './develop/develop.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgReduxModule,
        FormsModule,
        HttpModule,
        SharedModule,
        SitesModule,
        ManageModule,
        EditModule,
        DevelopModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<any>,
                devTools: DevToolsExtension,
    ) {

        ngRedux.configureStore(rootReducer, this.getSessionStore(), [
                createLogger({level: 'info', collapsed: false}),
                thunk,
            ],
            devTools.isEnabled() ? [devTools.enhancer()] : []);

        ngRedux.subscribe(() => {
            sessionStorage.setItem('store', JSON.stringify(ngRedux.getState()));
        });
    }

    private getSessionStore() {
        let initialStore = sessionStorage.getItem('store');
        if (!initialStore) {
            return {};
        }
        try {
            return JSON.parse(initialStore);
        } catch(e) {
            console.warn(e);
            return {};
        }
    }

}
