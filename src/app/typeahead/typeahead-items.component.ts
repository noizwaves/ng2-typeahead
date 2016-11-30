import {Component, Input} from '@angular/core';
import {TypeaheadStrategy} from './typeahead-strategy';

@Component({
  selector: 'typeahead-items',
  template: `
    <div class="typeahead-items">
      <div *ngFor="let item of strategy.items | async">{{item}}</div>
    </div>`,

})
export class TypeaheadItemsComponent {
  @Input('strategy') strategy:TypeaheadStrategy;
}
