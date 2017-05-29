import { Component, OnInit } from '@angular/core';
import {SitesService} from '../../shared/domain/sites.service';
import {ISitesListState} from '../../store/sites/sitesList';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public $sites;
    isInitialized = false;
  constructor(
      private sites: SitesService,
      private router: Router,
  ) {
      this.$sites = sites.getAvailableSites();
      this.$sites.subscribe((result: ISitesListState) => {
          this.isInitialized = !result.isLoading || result.items.length > 0;
      });
      router.events
//      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
          console.log(event);
      });

  }

  refresh() {
      this.sites.getAvailableSites();
  }
  ngOnInit() {
  }

}
