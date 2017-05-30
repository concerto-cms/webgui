import {Component, OnDestroy, OnInit} from '@angular/core';
import {SitesService} from '../../shared/domain/sites.service';
import {ISitesListState} from '../../store/sites/sitesList';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public $sites;
    isInitialized = false;
    sitesSub;

    constructor(private sites: SitesService,) {

    }

    refresh() {
        this.sites.getAvailableSites();
    }

    ngOnInit() {
        this.$sites = this.sites.getAvailableSites();
        this.sitesSub = this.$sites.subscribe((result: ISitesListState) => {
            this.isInitialized = !result.isLoading || result.items.length > 0;
        });
    }

    ngOnDestroy() {
        this.sitesSub.unsubscribe();
    }

}
