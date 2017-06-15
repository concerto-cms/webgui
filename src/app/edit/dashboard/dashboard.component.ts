import {Component, OnInit} from '@angular/core';
import {ModelsService} from '../../shared/domain/models.service';
import {ContentService} from '../../shared/domain/content.service';
import {Observable} from 'rxjs/Observable';
import {IContentListState} from '../../store/content/contentList';
import {IModelsListState} from '../../store/models/modelsList';
import {getIndexById} from '../../shared/arrayUtils';
import {MdDialog} from '@angular/material';
import {CreateContentComponent} from '../create-content/create-content.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    $models;
    $content;
    $modelContentStream;
    $sitemapStream;
    $isInitialized;

    constructor(
        private models: ModelsService,
        private content: ContentService,
        private dialog: MdDialog,
    ) {
        this.$models = models.getModels();
        this.$content = content.getContent();
        this.$modelContentStream = this.getModelsContentStream(this.$content, this.$models);

        this.$isInitialized = this.$modelContentStream.map(result => {
            return !result.isLoading || result.items.length > 0;
        });

        this.$sitemapStream = this.getSitemapStream(this.$content, this.$models);
    }

    ngOnInit() {

    }

    getModelsContentStream($content, $models) {
        $content.do(content => console.log('content'));
        $models.do(models => console.log('models'));
        return Observable.combineLatest($content, $models)
            .map((data: any) => {
                const content: IContentListState = data[0];
                const models: IModelsListState = data[1];
                const result = {
                    isLoading: content.isLoading || models.isLoading,
                    items: models.items,
                };
                result.items.forEach(item => {
                    item.contentItems = [];
                });
                content.items.forEach(contentItem => {
                    const index = getIndexById(result.items, contentItem.modelId);
                    if (index > -1) {
                        result.items[index].contentItems.push(contentItem);
                    }
                });
                return result;
            });
    }
    getSitemapStream($content, $models) {
        const $modelIdStream = $models
            .map(models => models.items
                .filter(model => model.isWebpage)
                .map(model => model._id)
            );
        return Observable.combineLatest($content.map(state => state.items), $modelIdStream)
            .map((result: [any, any]) => result[0].filter(item => result[1].includes(item.modelId)))
    }
    openCreateDialog(model) {
        const dialog = this.dialog.open(CreateContentComponent, {
            data: {
                model
            }
        });
    }
}
