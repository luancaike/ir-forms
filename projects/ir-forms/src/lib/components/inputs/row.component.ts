import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { IrBaseComponents } from './components.base';

@Component({
  selector: 'ir-text-input',
  template: `
    <div class="row">
      <ng-container *ngFor="let field of options.children">
        <div [classList]="field.colClasslist || ['col-12']">
          <ir-form-field [form]="formRoot" [options]="field"> </ir-form-field>
        </div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class IrRowComponent extends IrBaseComponents implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('IrRowComponent', changes);
  }
}
