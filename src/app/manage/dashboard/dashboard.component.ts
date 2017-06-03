import {Component, OnInit} from '@angular/core';
import {SitesService} from '../../shared/domain/sites.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    isInitialized = false;
    $site;
    siteSub;
    site;
    constructor(
        private sites: SitesService,
        private router: Router,
    ) {
        this.$site = this.sites.getActiveSite();
        this.siteSub = this.$site.subscribe((site) => {
            if (!site || !site.name || !site.role) {
                this.isInitialized = false;
                return;
            }
                this.site = Object.assign({}, site);
            this.isInitialized = true;
        });

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.siteSub.unsubscribe();
    }
    save() {
        this.sites.updateSite(this.site);
    }
    delete() {
        this.sites.deleteSite(this.site);
        this.router.navigate(['/']);
    }

}
