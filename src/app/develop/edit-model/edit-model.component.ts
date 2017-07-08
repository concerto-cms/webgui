import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModelsService} from '../../shared/domain/models.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-edit-model',
    templateUrl: './edit-model.component.html',
    styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit, OnDestroy {

    $model;
    model: any = {
        fields: [],
    };
    isInitialized = false;
    modelSub;
    constructor(
        private models: ModelsService,
        private router: Router,
    ) {
        this.$model = models.getActiveModel().map(model => {
            if (!model) {
                return null;
            }
            if (typeof model.fields === 'undefined') {
                model.fields = [];
                return model;
            }
            model.fields.map(field => {
                if (typeof field.options === 'undefined') {
                    field.options = {};
                }
                return field;
            });
            return model;
        });
    }

    ngOnInit() {

        this.modelSub = this.$model.subscribe((model) => {
            if (!model) {
                this.isInitialized = false;
                return;
            }
            this.model = model;
            this.isInitialized = true;
        });
    }

    ngOnDestroy() {
        this.modelSub.unsubscribe();
    }

    remove() {
        this.models.deleteModel(this.model).then(() => {
            this.router.navigate(['/', this.model.siteId, 'develop', 'models']);
        });

    }

    save() {
        this.models.updateModel(this.model);
    }

}
