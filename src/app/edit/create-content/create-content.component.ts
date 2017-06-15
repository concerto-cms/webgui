import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {SitesService} from '../../shared/domain/sites.service';
import {ContentService} from '../../shared/domain/content.service';

@Component({
    selector: 'app-create-content',
    templateUrl: './create-content.component.html',
    styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {
    item: any = {};
    model;
    isLoading: boolean = false;

    constructor(
        public dialogRef: MdDialogRef<CreateContentComponent>,
        @Inject(MD_DIALOG_DATA) data,
        private sites: SitesService,
        private content: ContentService,
    ) {
        this.model = data.model;
        this.item.modelId = this.model._id;
        if (this.model.isWebpage) {
            this.item.webpage = {
                title: '',
                url: '',
                meta: {
                    description: '',
                }
            }
        }
        sites.getActiveSite().subscribe(site => {
            this.item.siteId = site._id;
        });
    }

    ngOnInit() {
    }

    save() {
        this.isLoading = true;
        if (this.model.isWebpage) {
            this.item.webpage.title = this.item.name;
        }
        this.content.createItem(this.item).then((result) => {
            this.dialogRef.close();
        }).catch(err => {
            console.error(err);
            this.isLoading = false;
        });
        console.log(this.item);
    }
}
