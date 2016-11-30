import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
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

  it('displays a list of matches', () => {
    let typeaheadItemsEl = fixture.debugElement.query(By.css('.typeahead-items'));
    expect(typeaheadItemsEl.nativeElement).not.toBeNull();

    expect(typeaheadItemsEl.children.length).toBe(2);
    expect(typeaheadItemsEl.children[0].nativeElement.textContent).toEqual('foobar');
    expect(typeaheadItemsEl.children[1].nativeElement.textContent).toEqual('foobaz');
  });
});

@Component({
  template: `
    <input type="text" typeahead="typeahead" [formControl]="stateControl"/>
    <typeahead-items [strategy]="typeahead"></typeahead-items>
`
})
class TestComponent {
  stateControl = new FormControl(null, Validators.required);
  typeahead: TypeaheadStrategy;

  constructor(tb: TypeaheadBuilder) {
    this.typeahead = tb.fixedList(['foobar', 'foobaz']);
  }
}
