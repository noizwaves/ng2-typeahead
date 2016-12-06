import {TypeaheadStrategy, StringsParam, TypeaheadItemsParam} from './typeahead-strategy';
import {TypeaheadItem} from './typeahead-item.model';

describe('TypeaheadStrategy', () => {
  describe('when initialised with an array of strings', () => {
    it('treats the strings as both name and value', (done) => {
      let strategy = new TypeaheadStrategy(new StringsParam(['foo', 'bar', 'baz']));

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

  describe('when initialised with an array of TypeaheadItem', () => {
    it('uses names as names and values as values', (done) => {
      let strategy = new TypeaheadStrategy(new TypeaheadItemsParam([{name: 'FooBaR', value: 'foobar'}]));

      strategy.items.subscribe((items:TypeaheadItem[]) => {
        expect(items).toEqual([
          {name: 'FooBaR', value: 'foobar'},
        ]);

        done();
      });

      strategy.setQuery('');
    });
  });
});
