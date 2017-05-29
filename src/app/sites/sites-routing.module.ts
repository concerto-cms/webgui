import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteComponent } from './site/site.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':siteID', component: SiteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
