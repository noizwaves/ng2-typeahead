import {Injectable} from '@angular/core';
import {TypeaheadStrategy, StringsParam, TypeaheadItemsParam} from './typeahead-strategy';
import {TypeaheadItem} from './typeahead-item.model';

@Injectable()
export class TypeaheadBuilder {
  constantArray(items: string[]): TypeaheadStrategy {
    return new TypeaheadStrategy(new StringsParam(items));
  }

  constantTypeaheadItems(items: TypeaheadItem[]): TypeaheadStrategy {
    return new TypeaheadStrategy(new TypeaheadItemsParam(items));
  }
}
