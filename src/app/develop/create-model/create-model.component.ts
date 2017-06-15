import {Component, OnDestroy, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {SitesService} from '../../shared/domain/sites.service';
import {ModelsService} from '../../shared/domain/models.service';

@Component({
    selector: 'app-create-model',
    templateUrl: './create-model.component.html',
    styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent implements OnInit, OnDestroy {
    isLoading = false;
    model: any = {
        isWebpage: true,
        structure: 'list',
    };
    siteSub;

    constructor(
        public dialogRef: MdDialogRef<CreateModelComponent>,
        private sites: SitesService,
        private models: ModelsService,

    ) {
        this.siteSub = sites.getActiveSite().subscribe(site => {
            this.model.siteId = site._id;
        });
    }

    ngOnInit() {
    }
    ngOnDestroy() {
        this.siteSub.unsubscribe();
    }
    save() {
        this.isLoading = true;
        this.models.createModel(this.model).then((result) => {
            this.dialogRef.close();
        }).catch(err => {
            console.error(err);
            this.isLoading = false;
        });
    }
}
