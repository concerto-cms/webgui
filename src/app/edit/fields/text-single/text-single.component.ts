import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-field-text-single',
    templateUrl: './text-single.component.html',
    styleUrls: ['./text-single.component.css']
})
export class TextSingleComponent {
    @Input() field;
    @Input('value') _value = '';
    @Output() valueChange = new EventEmitter();

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.valueChange.emit({name: this.field.name, value: val});
    }

    constructor() { }

    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

}
