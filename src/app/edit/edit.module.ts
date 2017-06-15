import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '@angular/material';
import { CreateContentComponent } from './create-content/create-content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditContentComponent } from './edit-content/edit-content.component';

const routes: Routes = [
    {path: ':siteID/edit', component: DashboardComponent},
    {path: ':siteID/edit/:contentID', component: EditContentComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [RouterModule],
    entryComponents: [CreateContentComponent],
    declarations: [DashboardComponent, CreateContentComponent, EditContentComponent],
})
export class EditModule {
}
