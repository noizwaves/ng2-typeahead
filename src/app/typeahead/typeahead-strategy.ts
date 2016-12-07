import {Observable, Subject} from 'rxjs/Rx';
import * as _ from 'lodash';
import {TypeaheadItem} from './typeahead-item.model';

export class StringsParam {
  constructor(public items: string[]) {
  }
}

export class TypeaheadItemsParam {
  constructor(public items: TypeaheadItem[]) {
  }
}

export interface NamedObject {
  name: string;
}

export class ObjectsParam<T extends NamedObject> {
  constructor(public items: T[]) {
  }
}

export class TypeaheadStrategy {
  private _queries = new Subject<string>();
  private _selectedItem = new Subject<TypeaheadItem>();
  private _items: Observable<TypeaheadItem[]>;

  constructor(allItems: StringsParam|TypeaheadItemsParam|ObjectsParam<any>) {
    let items: TypeaheadItem[] = null;

    if (allItems instanceof TypeaheadItemsParam) {
      items = allItems.items;
    } else if (allItems instanceof StringsParam) {
      items = allItems.items.map(s => {
        return {name: s, value: s}
      });
    } else if (allItems instanceof ObjectsParam) {
      items = allItems.items.map(item => {
        return {name: item.name, value: item}
      });
    } else {
      throw 'Unexpected type for `allItems`';
    }

    this._items = Observable.merge(
      this._queries.map(q => _.filter(items, (s: TypeaheadItem) => s.name.startsWith(q))),
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
