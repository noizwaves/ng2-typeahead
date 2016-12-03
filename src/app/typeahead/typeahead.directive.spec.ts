import {FormControl} from '@angular/forms';
import {Component, NgModule} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TypeaheadDirective} from './typeahead.directive';
import {TypeaheadStrategy} from './typeahead-strategy';
import {TypeaheadModule} from './typeahead.module';
import {TypeaheadItemsComponent} from './typeahead-items.component';

describe('TypeaheadDirective', () => {
  beforeEach(() => {
    @NgModule({
      entryComponents: [TypeaheadItemsComponent]
    })
    class TestModule {
    }

    TestBed.configureTestingModule({
      declarations: [
        WithItemsComponent,
        WithoutItemsComponent,
      ],
      imports: [
        TestModule,
        TypeaheadModule,
      ]
    });
  });

  describe('initialisation', () => {
    it('throws exception when "strategy" input is not provided', () => {
      let directive = new TypeaheadDirective(null, null, null);

      directive.formControl = {} as FormControl;
      directive.strategy = null;

      try {
        directive.ngOnInit();

        fail('exception not thrown');
      } catch (e) {
      }
    });

    it('throws exception when "formControl" input is not provided', () => {
      let directive = new TypeaheadDirective(null, null, null);
      directive.formControl = null;
      directive.strategy = {} as TypeaheadStrategy;

      try {
        directive.ngOnInit();

        fail('exception not thrown');
      } catch (e) {
      }
    });
  });

  describe('items component in template', () => {
    let fixture: ComponentFixture<WithItemsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(WithItemsComponent);
      fixture.detectChanges();
    });

    it('should insert an "items component" after the <input>', () => {
      expect(fixture.nativeElement.children[0].tagName).toBe('INPUT');

      expect(fixture.nativeElement.children[1]).not.toBeNull();
      expect(fixture.nativeElement.children[1].tagName).toBe('TYPEAHEAD-ITEMS');
    });
  });

  describe('no items component in template', () => {
    let fixture: ComponentFixture<WithoutItemsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(WithoutItemsComponent);
      fixture.detectChanges();
    });

    it('should insert an "items component" after the <input>', () => {
      expect(fixture.nativeElement.children[0].tagName).toBe('INPUT');

      expect(fixture.nativeElement.children[1]).not.toBeNull();
      expect(fixture.nativeElement.children[1].tagName).toBe('TYPEAHEAD-ITEMS');
    });
  });
});

@Component({
  template: `
    <input type="text" [typeahead]="strategy" [formControl]="control"/>
    <typeahead-items [strategy]="strategy"></typeahead-items>
`
})
class WithItemsComponent {
  control = new FormControl();
  strategy = new TypeaheadStrategy([]);
}

@Component({
  template: `
    <input type="text" [typeahead]="strategy" [formControl]="control"/>
`
})
class WithoutItemsComponent {
  control = new FormControl();
  strategy = new TypeaheadStrategy([]);
}
