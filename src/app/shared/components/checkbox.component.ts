import {Component, Input, Host } from '@angular/core';
import { CheckboxGroupComponent } from './checkbox-group.component';

@Component({
    selector: 'checkbox',
    template: `
    <div (click)="toggleCheck()" class="form-check">
        <input type="checkbox" class="form-check-input" [checked]="isChecked()" />
        <ng-content></ng-content>
    </div>`
})
export class CheckboxComponent {
    @Input() value: any;

    constructor(@Host() private checkboxGroup: CheckboxGroupComponent) {
    }

    toggleCheck() {
        this.checkboxGroup.addOrRemove(this.value);
    }

    isChecked() {
        return this.checkboxGroup.contains(this.value);
    }
}