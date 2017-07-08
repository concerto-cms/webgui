import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {AuthService} from './auth.service';
import {SitesService} from './domain/sites.service';
import {ApiService} from './api.service';
import {ModelsService} from './domain/models.service';
import { ContentComponent } from './content/content.component';
import {ContentService} from './domain/content.service';
import { FieldsComponent } from './fields/fields.component';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [ContentComponent, FieldsComponent],
    exports: [SharedRoutingModule, ContentComponent, FieldsComponent],
    providers: [ApiService, AuthService, SitesService, ModelsService, ContentService]
})
export class SharedModule {}
