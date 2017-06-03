import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SitesRoutingModule} from './sites-routing.module';
import {MaterialModule} from '@angular/material';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SiteComponent} from './site/site.component';
import {CreateSiteComponent} from './create-site/create-site.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        SitesRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [MaterialModule],
    declarations: [DashboardComponent, SiteComponent, CreateSiteComponent],
    entryComponents: [CreateSiteComponent],
})
export class SitesModule {
}
