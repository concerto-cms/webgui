import {Component, Input, OnInit} from '@angular/core';
import {CreateFieldComponent} from '../../develop/create-field/create-field.component';
import {MdDialog} from '@angular/material';
import * as types from '../../edit/fields';

@Component({
    selector: 'app-fields',
    templateUrl: './fields.component.html',
    styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {

    constructor(private dialog: MdDialog,) {
    }

    @Input() fields = [];
    activeField = null;
    fieldTypes = types;

    ngOnInit() {
    }

    addField() {
        const dialog = this.dialog.open(CreateFieldComponent)
            .afterClosed().filter(field => !!field).subscribe(field => {
                this.fields.push(field);
                this.setActiveField(field);
            });
    }

    setActiveField(field) {
        if (field === this.activeField) {
            this.activeField = null;
            return;
        }
        this.activeField = field;
    }

}
