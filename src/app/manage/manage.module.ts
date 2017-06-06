import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
    {path: ':siteID/manage', component: DashboardComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    exports: [
        RouterModule,
    ],
    declarations: [DashboardComponent]
})
export class ManageModule {
}
