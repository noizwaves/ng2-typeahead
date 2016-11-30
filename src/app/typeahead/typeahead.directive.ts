import {Directive, Input} from '@angular/core';
import {TypeaheadStrategy} from './typeahead-strategy';

@Directive({
  selector: '[typeahead]'
})
export class TypeaheadDirective {
  @Input('typeahead') strategy:TypeaheadStrategy;

  constructor() {
  }
}
