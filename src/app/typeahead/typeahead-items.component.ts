import {Component, Input} from '@angular/core';
import {TypeaheadStrategy} from './typeahead-strategy';
import {TypeaheadItem} from './typeahead-item.model';

@Component({
  selector: 'typeahead-items',
  template: `
    <div class="typeahead-items">
      <div *ngFor="let item of strategy.items | async" (click)="onItemClick(item)">{{item.label}}</div>
    </div>`,

})
export class TypeaheadItemsComponent {
  @Input('strategy') strategy:TypeaheadStrategy;

  private onItemClick(item: TypeaheadItem) {
    this.strategy.setValue(item);
  }
}
