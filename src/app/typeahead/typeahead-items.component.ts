import {Component, Input} from '@angular/core';
import {TypeaheadStrategy} from './typeahead-strategy';

@Component({
  selector: 'typeahead-items',
  template: `
    <div class="typeahead-items">
      <div *ngFor="let item of strategy.items | async" (click)="onItemClick(item)">{{item}}</div>
    </div>`,

})
export class TypeaheadItemsComponent {
  @Input('strategy') strategy:TypeaheadStrategy;

  private onItemClick(item: string) {
    this.strategy.setValue(item);
  }
}
