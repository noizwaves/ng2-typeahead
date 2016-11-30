import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {TypeaheadStrategy} from './typeahead-strategy';
import {TypeaheadBuilder} from './typeahead-builder';
import {TypeaheadModule} from './typeahead.module';

describe('Directive: Typeahead', () => {
  let fixture: ComponentFixture<TestComponent>;

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
    fixture.detectChanges();
  });

  it('accepts any text as input', () => {
    let inputEl = fixture.debugElement.query(By.css('input'));

    inputEl.nativeElement.value = 'Foobar';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    let stateControl = fixture.componentInstance.stateControl;
    expect(stateControl.value).toBe('Foobar');
    expect(stateControl.valid).toBe(true);

    expect(fixture.componentInstance.stateControl.valid).toBe(true);
  });

  it('displays a list of filtered matches', () => {
    let typeaheadItemsEl = fixture.debugElement.query(By.css('.typeahead-items'));
    expect(typeaheadItemsEl.nativeElement).not.toBeNull();

    let inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.nativeElement.value = 'foo';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(typeaheadItemsEl.children.length).toBe(2);
    expect(typeaheadItemsEl.children[0].nativeElement.textContent).toEqual('foobar');
    expect(typeaheadItemsEl.children[1].nativeElement.textContent).toEqual('foobaz');

    inputEl.nativeElement.value = 'foobar';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(typeaheadItemsEl.children.length).toBe(1);
    expect(typeaheadItemsEl.children[0].nativeElement.textContent).toEqual('foobar');
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
