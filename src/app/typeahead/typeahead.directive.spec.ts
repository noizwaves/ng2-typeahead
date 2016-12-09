import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Component, NgModule} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TypeaheadDirective} from './typeahead.directive';
import {TypeaheadStrategy, StringsParam} from './typeahead-strategy';
import {TypeaheadModule} from './typeahead.module';
import {TypeaheadItemsComponent} from './typeahead-items.component';
import {By} from '@angular/platform-browser';

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
        WithUnexpectedSiblingComponent,
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
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

  describe('input having unexpected sibling', () => {
    let fixture: ComponentFixture<WithUnexpectedSiblingComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(WithUnexpectedSiblingComponent);
      fixture.detectChanges();
    });

    it('should insert an "items component" in between', () => {
      expect(fixture.nativeElement.children[0].tagName).toBe('INPUT');

      expect(fixture.nativeElement.children[1]).not.toBeNull();
      expect(fixture.nativeElement.children[1].tagName).toBe('TYPEAHEAD-ITEMS');

      expect(fixture.nativeElement.children[2]).not.toBeNull();
      expect(fixture.nativeElement.children[2].tagName).toBe('DIV');
    });
  });

  describe('selecting an item', () => {
    let fixture: ComponentFixture<WithItemsComponent>;
    let component: WithItemsComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(WithItemsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.strategy.setValue({label: 'Foo', value: 'bar'});
      fixture.detectChanges();
    });

    it('sets the control value to the item value', () => {
      expect(component.control.value).toBe('Foo');
    });

    it('sets the input value to the item name', () => {
      let inputEl = fixture.debugElement.query(By.css('input'));
      expect(inputEl.nativeElement.value).toBe('Foo');
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
  strategy = new TypeaheadStrategy(new StringsParam([]));
}

@Component({
  template: `
    <input type="text" [typeahead]="strategy" [formControl]="control"/>
`
})
class WithoutItemsComponent {
  control = new FormControl();
  strategy = new TypeaheadStrategy(new StringsParam([]));
}

@Component({
  template: `
    <input type="text" [typeahead]="strategy" [formControl]="control"/>
    <div>foobar</div>
`
})
class WithUnexpectedSiblingComponent {
  control = new FormControl();
  strategy = new TypeaheadStrategy(new StringsParam([]));
}
