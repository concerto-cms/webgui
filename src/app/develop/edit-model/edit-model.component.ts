import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModelsService} from '../../shared/domain/models.service';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {CreateFieldComponent} from '../create-field/create-field.component';

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
    activeField = null;
    constructor(
        private models: ModelsService,
        private router: Router,
        private dialog: MdDialog,
    ) {
        this.$model = models.getActiveModel();
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

    addField() {
        const dialog = this.dialog.open(CreateFieldComponent, {
        }).afterClosed().filter(field => !!field).subscribe(field => {
            this.model.fields.push(field);
            this.setActiveField(field);
        });
    }

    save() {
        this.models.updateModel(this.model);
    }
    setActiveField(field) {
        this.activeField = field;
    }

}
