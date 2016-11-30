import {Injectable} from '@angular/core';
import {TypeaheadStrategy} from './typeahead-strategy';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TypeaheadBuilder {
  fixedList(items: string[]): TypeaheadStrategy {
    return new TypeaheadStrategy(Observable.of(items));
  }
}
