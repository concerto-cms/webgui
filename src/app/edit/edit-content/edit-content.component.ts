import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContentService} from '../../shared/domain/content.service';
import {ModelsService} from '../../shared/domain/models.service';
import {SitesService} from '../../shared/domain/sites.service';

import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';
@Component({
    selector: 'app-edit-content',
    templateUrl: './edit-content.component.html',
    styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit, OnDestroy {

    item: any = {};
    $model;
    $site;
    $contentItem;
    $isInitialized;
    contentSub;

    constructor(
        private content: ContentService,
        private models: ModelsService,
        private sites: SitesService,
    ) {
        this.$site = this.sites.getActiveSite().filter(site => !!site);
        this.$model = this.models.getActiveModel().filter(model => !!model);
        this.$contentItem = this.content.getActiveContentItem().filter(item => !!item);

        this.contentSub = this.$contentItem.subscribe(item => {
            console.log('item', item);
            this.item = item;
            this.models.setActiveModel(item.modelId);
            this.sites.setActiveSite(item.siteId);
        });
        this.$isInitialized = Observable.combineLatest(this.$site, this.$model, this.$contentItem)
            .map(result => true)
            .startWith(false);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.contentSub.unsubscribe();
    }

    save() {

        this.content.updateContentItem(this.item);
    }
}
