import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {SitesService} from '../../shared/domain/sites.service';

@Component({
    selector: 'app-create-site',
    templateUrl: './create-site.component.html',
    styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent implements OnInit {
    site: any = {};
    isLoading = false;

    constructor(
        public dialogRef: MdDialogRef<CreateSiteComponent>,
        private sites: SitesService,
    ) {
    }

    ngOnInit() {
    }

    save() {
        this.isLoading = true;
        this.sites.createSite(this.site).then((result) => {
            this.dialogRef.close();
        }).catch(err => {
            console.error(err);
            this.isLoading = false;
        });
    }
}
