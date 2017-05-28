import { Component, OnInit } from '@angular/core';
import {SitesService} from '../../shared/domain/sites.service';
import {ISitesListState} from '../../store/sites/sitesList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public $sites;
    isInitialized = false;
  constructor(
      sites: SitesService,
  ) {
      this.$sites = sites.getAvailableSites();
      this.$sites.subscribe((result: ISitesListState) => {
          console.log(result);
          this.isInitialized = !result.isLoading;
          console.log(this.isInitialized);
      });
  }

  ngOnInit() {
  }

}
