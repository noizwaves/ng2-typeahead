import {TypeaheadDirective} from './typeahead.directive';
import {FormControl} from '@angular/forms';
import {TypeaheadStrategy} from './typeahead-strategy';

describe('TypeaheadDirective', () => {
  describe('initialisation', () => {
    it('throws exception when "strategy" input is not provided', () => {
      let directive = new TypeaheadDirective(null, null, null);

      directive.formControl = {} as FormControl;
      directive.strategy = null;

      try {
        directive.ngOnInit();

        fail('exception not thrown');
      } catch (e) { }
    });

    it('throws exception when "formControl" input is not provided', () => {
      let directive = new TypeaheadDirective(null, null, null);
      directive.formControl = null;
      directive.strategy = {} as TypeaheadStrategy;

      try {
        directive.ngOnInit();

        fail('exception not thrown');
      } catch (e) { }
    });
  });
});
