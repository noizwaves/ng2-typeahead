import {TypeaheadStrategy} from './typeahead-strategy';
import {TypeaheadItem} from './typeahead-item.model';

describe('TypeaheadStrategy', () => {
  describe('when initialised with an array of strings', () => {
    it('treats the strings as both name and value', (done) => {
      let strategy = new TypeaheadStrategy(['foo', 'bar', 'baz']);

      strategy.items.subscribe((items:TypeaheadItem[]) => {
        expect(items).toEqual([
          { name: 'foo', value: 'foo'},
          { name: 'bar', value: 'bar'},
          { name: 'baz', value: 'baz'},
        ]);

        done();
      });

      strategy.setQuery('');
    });
  });
});
