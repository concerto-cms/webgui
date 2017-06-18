import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialModule} from '@angular/material';
import {ModelsComponent} from './models/models.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { EditModelComponent } from './edit-model/edit-model.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { BlocksComponent } from './blocks/blocks.component';
import { EditBlockComponent } from './edit-block/edit-block.component';
import { CreateBlockComponent } from './create-block/create-block.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateFieldComponent } from './create-field/create-field.component';

const routes: Routes = [
    {path: ':siteID/develop', component: DashboardComponent},
    {path: ':siteID/develop/models', component: ModelsComponent},
    {path: ':siteID/develop/models/:modelID', component: EditModelComponent},
    {path: ':siteID/develop/blocks', component: BlocksComponent},
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MaterialModule,
        SharedModule,
    ],
    exports: [
        RouterModule,
    ],
    entryComponents: [CreateModelComponent, CreateFieldComponent],
    declarations: [DashboardComponent, ModelsComponent, SubmenuComponent, EditModelComponent, CreateModelComponent, BlocksComponent, EditBlockComponent, CreateBlockComponent, CreateFieldComponent]
})
export class DevelopModule {
}
