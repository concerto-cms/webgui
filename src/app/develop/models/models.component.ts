import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISitesListState} from '../../store/sites/sitesList';
import {MdDialog} from '@angular/material';
import {ModelsService, SitesService} from '../../shared/domain';
import {IModelsListState} from '../../store/models/modelsList';

@Component({
    selector: 'app-develop-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit, OnDestroy {
    public $models;
    $isInitialized;
    $activeSite;
    constructor(
        private models: ModelsService,
        private sites: SitesService,
        private dialog: MdDialog,
    ) {
        this.$activeSite = sites.getActiveSite();
        this.$models = models.getModels();
        this.$isInitialized = this.$models.map((result: IModelsListState) => {
            return !result.isLoading || result.items.length > 0;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
    openCreateDialog() {
        /*
        const dialog = this.dialog.open(CreateSiteComponent, {

        });
         */
    }
}
