import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {AuthService} from './auth.service';
import {SitesService} from './domain/sites.service';
import {ApiService} from './api.service';
import {ModelsService} from './domain/models.service';
import { ContentComponent } from './content/content.component';

@NgModule({
    imports: [
        CommonModule,
        SharedRoutingModule,
    ],
    declarations: [ContentComponent],
    exports: [SharedRoutingModule, ContentComponent],
    providers: [ApiService, AuthService, SitesService, ModelsService]
})
export class SharedModule {}
