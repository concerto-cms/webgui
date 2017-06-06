import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModelsService} from '../../shared/domain/models.service';

@Component({
    selector: 'app-edit-model',
    templateUrl: './edit-model.component.html',
    styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit, OnDestroy {

    $model;
    isInitialized = false;
    modelSub;
    constructor(
        models: ModelsService,
    ) {
        this.$model = models.getActiveModel();
    }

    ngOnInit() {

        this.modelSub = this.$model.subscribe((model) => {
            if (!model) {
                this.isInitialized = false;
                return;
            }
            this.isInitialized = true;
        });
    }

    ngOnDestroy() {
        this.modelSub.unsubscribe();
    }

}
