import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialModule} from '@angular/material';
import {ModelsComponent} from './models/models.component';
import { SubmenuComponent } from './submenu/submenu.component';

const routes: Routes = [
    {path: ':siteID/develop', component: DashboardComponent},
    {path: ':siteID/develop/models', component: ModelsComponent},
    {path: ':siteID/develop/blocks', component: ModelsComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
    ],
    exports: [
        RouterModule,
    ],
    declarations: [DashboardComponent, ModelsComponent, SubmenuComponent]
})
export class DevelopModule {
}
