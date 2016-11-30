import {Observable, Subject} from 'rxjs/Rx';
import * as _ from 'lodash';

export class TypeaheadStrategy {
  private queries: Subject<string> = new Subject<string>();
  private _items: Observable<string[]>;

  constructor(private allItems: string[]) {
    this._items = this.queries
      .map<string[]>(q => _.filter(this.allItems, s => s.startsWith(q)));
  }

  public setQuery(query: string): void {
    this.queries.next(query);
  }

  get items(): Observable<string[]> {
    return this._items;
  }
}
