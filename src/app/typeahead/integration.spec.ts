import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, NgModule, DebugElement} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {TypeaheadStrategy} from './typeahead-strategy';
import {TypeaheadBuilder} from './typeahead-builder';
import {TypeaheadModule} from './typeahead.module';
import {TypeaheadItemsComponent} from './typeahead-items.component';

describe('Directive: Typeahead', () => {
  let fixture: ComponentFixture<TestComponentWithItems>;
  let page: TestComponentPage;

  beforeEach(() => {
    @NgModule({
      entryComponents: [TypeaheadItemsComponent]
    })
    class TestModule {}

    TestBed.configureTestingModule({
      declarations: [
        TestComponentWithItems,
        TestComponentWithoutItems
      ],
      imports: [
        TypeaheadModule,
        ReactiveFormsModule,
        TestModule,
      ]
    });

    fixture = TestBed.createComponent(TestComponentWithItems);
    page = new TestComponentPage(fixture);

    fixture.detectChanges();
  });

  it('accepts any text as input', () => {
    page.fillStateInput('Foobar');
    fixture.detectChanges();

    page.expectControlHasValue('Foobar');
    page.expectHasValidControl();
  });

  it('displays a list of filtered matches', () => {
    page.expectTypeaheadItemsPresent();

    page.fillStateInput('foo');
    fixture.detectChanges();

    page.expectItemsToEqual(['foobar', 'foobaz']);

    page.fillStateInput('foobar');
    fixture.detectChanges();

    page.expectItemsToEqual(['foobar']);
  });

  it('selects a value when item is clicked', () => {
    page.fillStateInput('foo');
    fixture.detectChanges();

    page.clickItemByValue('foobar');
    fixture.detectChanges();

    page.expectHasValidControl();
    page.expectControlHasValue('foobar');

    page.expectTypeaheadItemsPresent();
    page.expectItemsToEqual([]);
  });

  it('displays items if not explicitly included', () => {
    fixture = TestBed.createComponent(TestComponentWithoutItems);
    page = new TestComponentPage(fixture);
    fixture.detectChanges();

    page.expectTypeaheadItemsPresent();

    page.fillStateInput('foo');
    fixture.detectChanges();

    page.expectItemsToEqual(['foobar', 'foobaz']);
  });
});

@Component({
  template: `
    <input type="text" [typeahead]="strategy" [formControl]="stateControl"/>
    <typeahead-items [strategy]="strategy"></typeahead-items>
`
})
class TestComponentWithItems {
  stateControl = new FormControl(null, Validators.required);
  strategy: TypeaheadStrategy;

  constructor(tb: TypeaheadBuilder) {
    this.strategy = tb.constantList(['foobar', 'foobaz']);
  }
}

@Component({
  template: `
    <input type="text" [typeahead]="strategy" [formControl]="stateControl"/>
`
})
class TestComponentWithoutItems {
  stateControl = new FormControl(null, Validators.required);
  strategy: TypeaheadStrategy;

  constructor(tb: TypeaheadBuilder) {
    this.strategy = tb.constantList(['foobar', 'foobaz']);
  }
}

class TestComponentPage {
  constructor(private fixture: ComponentFixture<TestComponentWithItems|TestComponentWithoutItems>) {
  }

  public fillStateInput(value: string) {
    let inputEl = this.fixture.debugElement.query(By.css('input'));
    inputEl.nativeElement.value = value;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
  }

  public clickItemByValue(value: string) {
    let typeaheadItemsEl = this.fixture.debugElement.query(By.css('.typeahead-items'));
    let typeaheadItemEl = typeaheadItemsEl.children
      .filter((itemEl:DebugElement) => itemEl.nativeElement.textContent === value)[0];

    expect(typeaheadItemEl).not.toBeNull();

    typeaheadItemEl.nativeElement.click();

  }

  public expectHasValidControl() {
    let stateControl = this.fixture.componentInstance.stateControl;
    expect(stateControl.valid).toBe(true);
  }

  public expectTypeaheadItemsPresent() {
    let typeaheadItemsEl = this.fixture.debugElement.query(By.css('.typeahead-items'));
    expect(typeaheadItemsEl.nativeElement).not.toBeNull();
  }

  public expectControlHasValue(value: string) {
    let stateControl = this.fixture.componentInstance.stateControl;
    expect(stateControl.value).toBe(value);
  }

  public expectItemsToEqual(expectedItems: string[]) {
    let typeaheadItemsEl = this.fixture.debugElement.query(By.css('.typeahead-items'));
    let items = typeaheadItemsEl.children.map(de => de.nativeElement.textContent);
    expect(items).toEqual(expectedItems);
  }
}
