import {Component} from '@angular/core';
import {AuthService} from './shared/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {SitesService} from './shared/domain/sites.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Concerto CMS';
    showMenu = false;
    role: string;
    constructor(public auth: AuthService,
                sites: SitesService,
                router: Router,) {
        auth.handleAuthentication();
        if (!auth.isAuthenticated()) {
            auth.login();
        }
        router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => router.routerState.root.firstChild.snapshot.params)
            .map((params) => params.siteID ? params.siteID : null)
            .subscribe(id => sites.setActiveSite(id));
        sites.getActiveSite().subscribe(site => {
            if (!site) {
                this.role = null;
                this.title = 'Concerto CMS';
                this.showMenu = false;
                return;
            }
            this.showMenu = site.role !== 'EDITOR';
            this.role = site.role;
            this.title = site.name;
        });
    }
}
