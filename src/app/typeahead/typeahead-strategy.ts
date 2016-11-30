import {Observable} from 'rxjs/Rx';

export class TypeaheadStrategy {
  private items: Observable<string[]>;

  constructor(items: Observable<string[]>) {
    this.items = items;
  }
}
