import {TypeaheadStrategy, StringsParam, TypeaheadItemsParam, ObjectsParam} from './typeahead-strategy';
import {TypeaheadItem} from './typeahead-item.model';

describe('TypeaheadStrategy', () => {
  describe('when initialised with an array of strings', () => {
    it('treats the strings as both name and value', (done) => {
      let strategy = new TypeaheadStrategy(new StringsParam(['foo', 'bar', 'baz']));

      strategy.items.subscribe((items: TypeaheadItem[]) => {
        expect(items).toEqual([
          {label: 'foo', value: 'foo'},
          {label: 'bar', value: 'bar'},
          {label: 'baz', value: 'baz'},
        ]);

        done();
      });

      strategy.setQuery('');
    });
  });

  describe('when initialised with an array of TypeaheadItem', () => {
    it('uses names as names and values as values', (done) => {
      let strategy = new TypeaheadStrategy(new TypeaheadItemsParam([{label: 'FooBaR', value: 'foobar'}]));

      strategy.items.subscribe((items: TypeaheadItem[]) => {
        expect(items).toEqual([
          {label: 'FooBaR', value: 'foobar'},
        ]);

        done();
      });

      strategy.setQuery('');
    });
  });

  describe('when initialised with an array of objects', () => {
    it('uses name as name and the object as value', (done) => {
      let strategy = new TypeaheadStrategy(new ObjectsParam([{id: 1, foo: true, bar: 'baz', label: 'Foobar'}]));

      strategy.items.subscribe((items: TypeaheadItem[]) => {
        expect(items).toEqual([
          {label: 'Foobar', value: {id: 1, foo: true, bar: 'baz', label: 'Foobar'}},
        ]);

        done();
      });

      strategy.setQuery('');
    });
  });

  describe('dealing with focus changes', () => {
    let strategy:TypeaheadStrategy;

    beforeEach(() => {
      strategy = new TypeaheadStrategy(new StringsParam([]));
    });

    it('shows the list when focussed', (done) => {
      strategy.itemsVisible.subscribe(visible => {
        expect(visible).toEqual(true);

        done();
      });

      strategy.inputFocused();
    });

    it('hides the list when blurred', (done) => {
      strategy.itemsVisible.subscribe(visible => {
        expect(visible).toEqual(false);

        done();
      });

      strategy.inputBlurred();
    });
  });
});
