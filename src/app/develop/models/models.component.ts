import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISitesListState} from '../../store/sites/sitesList';
import {MdDialog} from '@angular/material';
import {ModelsService, SitesService} from '../../shared/domain';
import {IModelsListState} from '../../store/models/modelsList';
import {CreateModelComponent} from '../create-model/create-model.component';

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
//        this.$models.subscribe();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
    openCreateDialog() {
        const dialog = this.dialog.open(CreateModelComponent);
    }
    createCommonModels() {
        this.sites.getActiveSite().first().subscribe(site => {
            const siteId = site._id;
            this.models.createModel({
                name: "Webpage",
                siteId: siteId,
                structure: "list",
                isWebpage: true,
                fields: []

            });
            this.models.createModel({
                name: "Menu",
                siteId: siteId,
                structure: "list",
                isWebpage: false,
                fields: [
                    {
                        type: "text-single",
                        name: "label",
                        label: "Label"
                    },
                    {
                        type: "text-single",
                        name: "url",
                        label: "Url"
                    }
                ]
            });

        });
    }
}
