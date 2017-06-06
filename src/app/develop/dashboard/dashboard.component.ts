import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISitesListState} from '../../store/sites/sitesList';
import {MdDialog} from '@angular/material';
import {ModelsService, SitesService} from '../../shared/domain';
import {IModelsListState} from '../../store/models/modelsList';
import {Router} from '@angular/router';

@Component({
    selector: 'app-develop-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    $activeSite;

    constructor(
        private sites: SitesService,
        private router: Router,
    ) {
        this.$activeSite = sites.getActiveSite();
        this.$activeSite.filter(site => !!site).first().subscribe(site => {
            router.navigate([site._id, 'develop', 'models']);
        })
    }

    ngOnInit() {
    }
}
