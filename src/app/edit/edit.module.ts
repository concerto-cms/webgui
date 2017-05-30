import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
    {path: ':siteID/edit', component: DashboardComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
    ],
    exports: [RouterModule],
    declarations: [DashboardComponent],
})
export class EditModule {
}
