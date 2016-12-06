import {Observable, Subject} from 'rxjs/Rx';
import * as _ from 'lodash';
import {TypeaheadItem} from './typeahead-item.model';

export class TypeaheadStrategy {
  private _queries = new Subject<string>();
  private _selectedItem = new Subject<TypeaheadItem>();
  private _items: Observable<TypeaheadItem[]>;

  constructor(private allItems: string[]) {
    this._items = Observable.merge(
      this._queries
        .map<TypeaheadItem[]>(q => _
          .filter(this.allItems, s => s.startsWith(q))
          .map(str => { return { name: str, value: str } })
        ),
      this._selectedItem.map(() => [])
    );
  }

  public setQuery(query: string): void {
    this._queries.next(query);
  }

  public setValue(item: TypeaheadItem): void {
    this._selectedItem.next(item);
  }

  get items(): Observable<TypeaheadItem[]> {
    return this._items;
  }

  get selectedItem(): Observable<TypeaheadItem> {
    return this._selectedItem;
  }
}
