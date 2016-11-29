import { Ng2TypeaheadPage } from './app.po';

describe('ng2-typeahead App', function() {
  let page: Ng2TypeaheadPage;

  beforeEach(() => {
    page = new Ng2TypeaheadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
