import {Injectable} from '@angular/core';
import {TypeaheadStrategy} from './typeahead-strategy';

@Injectable()
export class TypeaheadBuilder {
  constantList(items: string[]): TypeaheadStrategy {
    return new TypeaheadStrategy(items);
  }
}
