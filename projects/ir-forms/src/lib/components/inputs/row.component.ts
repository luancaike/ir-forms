import { OnChanges, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { IrBaseComponents } from './components.base';

@Component({
  selector: 'ir-row',
  template: `
    <div class="row">
      <ng-container *ngFor="let field of options.children">
        <div
          *ngIf="!field.hidden"
          [classList]="field.colClasslist || ['col-12']"
        >
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
