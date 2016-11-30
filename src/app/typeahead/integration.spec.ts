import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {TypeaheadStrategy} from './typeahead-strategy';
import {TypeaheadBuilder} from './typeahead-builder';
import {TypeaheadModule} from './typeahead.module';

describe('Directive: Typeahead', () => {
  let fixture: ComponentFixture<TestComponent>;
  let page: TestComponentPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
      ],
      imports: [
        TypeaheadModule,
        ReactiveFormsModule,
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
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
    let typeaheadItemsEl = fixture.debugElement.query(By.css('.typeahead-items'));
    expect(typeaheadItemsEl.nativeElement).not.toBeNull();

    page.fillStateInput('foo');
    fixture.detectChanges();

    page.expectItemsToEqual(['foobar', 'foobaz']);

    page.fillStateInput('foobar');
    fixture.detectChanges();

    page.expectItemsToEqual(['foobar']);
  });
});

@Component({
  template: `
    <input type="text" typeahead [formControl]="stateControl"/>
    <typeahead-items [strategy]="strategy"></typeahead-items>
`
})
class TestComponent implements OnInit {
  stateControl = new FormControl(null, Validators.required);
  strategy: TypeaheadStrategy;

  constructor(tb: TypeaheadBuilder) {
    this.strategy = tb.constantList(['foobar', 'foobaz']);
  }

  ngOnInit(): void {
    this.stateControl.valueChanges.subscribe(v => this.strategy.setQuery(v));
  }
}

class TestComponentPage {
  constructor(private fixture: ComponentFixture<TestComponent>) {
  }

  public fillStateInput(value: string) {
    let inputEl = this.fixture.debugElement.query(By.css('input'));
    inputEl.nativeElement.value = value;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
  }

  public expectHasValidControl() {
    let stateControl = this.fixture.componentInstance.stateControl;
    expect(stateControl.valid).toBe(true);
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
