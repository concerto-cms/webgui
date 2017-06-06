import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SitesService} from './shared/domain/sites.service';
import {AuthService} from './shared/auth.service';
import {ModelsService} from './shared/domain/models.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Concerto CMS';
    showMenu = false;
    role: string;
    site;
    profile;
    constructor(
        sites: SitesService,
        models: ModelsService,
        router: Router,
        private auth: AuthService,
    ) {
        this.profile = auth.getProfile();
        const $routerParams = router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => router.routerState.root.firstChild.snapshot.params);
        $routerParams.map((params) => params.siteID ? params.siteID : null)
            .distinctUntilChanged()
            .subscribe(id => sites.setActiveSite(id));
        $routerParams.map((params) => params.modelID ? params.modelID : null)
            .distinctUntilChanged()
            .subscribe(id => models.setActiveModel(id));

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
