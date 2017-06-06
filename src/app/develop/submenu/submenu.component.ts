import {Component, OnInit} from '@angular/core';
import {SitesService} from '../../shared/domain/sites.service';

@Component({
    selector: 'app-develop-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {
    $activeSite;

    constructor(sites: SitesService) {
        this.$activeSite = sites.getActiveSite();
    }

    ngOnInit() {
    }

}
