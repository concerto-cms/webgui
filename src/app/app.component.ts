import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SitesService} from './shared/domain/sites.service';
import {AuthService} from './shared/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Concerto CMS';
    showMenu = false;
    role: string;
    site;
    profile;
    constructor(
        sites: SitesService,
        router: Router,
        private auth: AuthService,
    ) {
        this.profile = auth.getProfile();
        router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => router.routerState.root.firstChild.snapshot.params)
            .map((params) => params.siteID ? params.siteID : null)
            .subscribe(id => sites.setActiveSite(id));
        sites.getActiveSite().subscribe(site => {
            if (!site || !site.name || !site.role) {
                this.role = null;
                this.title = 'Concerto CMS';
                this.showMenu = false;
                this.site = null;
                return;
            }
            this.site = site;
            this.showMenu = site.role !== 'EDITOR';
            this.role = site.role;
            this.title = site.name;
        });
    }
    logout() {
        this.auth.logout();
    }
}
