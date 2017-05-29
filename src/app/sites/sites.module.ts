import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { MaterialModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteComponent } from './site/site.component';


@NgModule({
  imports: [
    CommonModule,
    SitesRoutingModule,
      MaterialModule,
  ],
    exports: [MaterialModule],
  declarations: [DashboardComponent, SiteComponent]
})
export class SitesModule { }
