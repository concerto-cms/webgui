import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-create-field',
    templateUrl: './create-field.component.html',
    styleUrls: ['./create-field.component.css']
})
export class CreateFieldComponent implements OnInit {

    field = {
        type: null,
        name: '',
        label: '',
    };

    constructor(
        private dialogRef: MdDialogRef<CreateFieldComponent>,
    ) {
    }

    ngOnInit() {
    }

    save() {
        this.field.label = this.field.name;
        this.dialogRef.close(this.field);
    }

}
