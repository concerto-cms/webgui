import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-field-text-multi',
  templateUrl: './text-multi.component.html',
  styleUrls: ['./text-multi.component.css']
})
export class TextMultiComponent {
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
