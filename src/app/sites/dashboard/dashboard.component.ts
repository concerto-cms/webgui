import {Component, OnInit} from '@angular/core';
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

    constructor(private sites: SitesService,) {
        this.$sites = sites.getAvailableSites();
        this.$sites.subscribe((result: ISitesListState) => {
            this.isInitialized = !result.isLoading || result.items.length > 0;
        });

    }

    refresh() {
        this.sites.getAvailableSites();
    }

    ngOnInit() {
    }

}
