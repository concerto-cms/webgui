import { Component, EventEmitter, AfterViewChecked, Input, Output} from '@angular/core';

@Component({
  selector: 'app-field-text-html',
  templateUrl: './text-html.component.html',
  styleUrls: ['./text-html.component.scss']
})
export class TextHtmlComponent implements AfterViewChecked {
    @Input() field;
    @Input('value') _value = '';
    @Output() valueChange = new EventEmitter();

    editor;
    elementId = 'tiny-' + Math.round(Math.random() * 10000);
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.valueChange.emit({name: this.field.name, value: val});
    }
    ngAfterViewChecked() {
        if (this.editor || !document.querySelector(`#${this.elementId}`)) {
            return;
        }
        this.editor = window["tinymce"].init({
            plugins: ['link', 'table'],
            selector: `#${this.elementId}`,
            skin_url: '/assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                editor.on('keyup change', () => {
                    const content = editor.getContent();
                    this.value = content;
                });
            }
        });
    }
    ngOnDestroy() {
        window["tinymce"].remove(this.editor);
        this.editor = null;
    }
    constructor() { }

    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }
}
