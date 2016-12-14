import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {TypeaheadStrategy} from './typeahead-strategy';
import {TypeaheadItem} from './typeahead-item.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'typeahead-items',
  template: `
    <div class="typeahead-items" *ngIf="showItems">
      <div *ngFor="let item of items" (click)="onItemClick(item)">{{item.label}}</div>
    </div>
`
})
  export class TypeaheadItemsComponent implements OnInit, OnDestroy {
  @Input('strategy') strategy:TypeaheadStrategy;

  private items:TypeaheadItem[] = [];
  private showItems:boolean = false;

  private itemsSub:Subscription;
  private visibleSub:Subscription;

  ngOnInit(): void {
    this.itemsSub = this.strategy.items.subscribe(items => {
      this.items = items;
    });

    this.visibleSub = this.strategy.itemsVisible.subscribe(visible => {
      this.showItems = visible;
    });
  }

  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
    this.visibleSub.unsubscribe();
  }

  private onItemClick(item: TypeaheadItem) {
    this.strategy.setValue(item);
  }
}
