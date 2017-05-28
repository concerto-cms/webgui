import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AuthService } from './auth.service';
import { SitesService } from './domain/sites.service';
import { ApiService } from './api.service';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [],
  providers: [AuthService, SitesService, ApiService]
})
export class SharedModule { }
