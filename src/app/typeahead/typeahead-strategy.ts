import {Observable, Subject} from 'rxjs/Rx';
import * as _ from 'lodash';

export class TypeaheadStrategy {
  private _queries = new Subject<string>();
  private _selectedValue = new Subject<string>();
  private _items: Observable<string[]>;

  constructor(private allItems: string[]) {
    this._items = Observable.merge(
      this._queries.map<string[]>(q => _.filter(this.allItems, s => s.startsWith(q))),
      this._selectedValue.map(() => [])
    );
  }

  public setQuery(query: string): void {
    this._queries.next(query);
  }

  public setValue(item: string): void {
    this._selectedValue.next(item);
  }

  get items(): Observable<string[]> {
    return this._items;
  }

  get selectedValue(): Observable<string> {
    return this._selectedValue;
  }
}
