import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('Directive: Typeahead', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    });
  });

  it('accepts any text as input', () => {
    let fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    let inputEl = fixture.debugElement.query(By.css('input'));

    inputEl.nativeElement.value = 'Foobar';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    let stateControl = fixture.componentInstance.form.get('state');
    expect(stateControl.value).toBe('Foobar');
    expect(stateControl.valid).toBe(true);

    expect(fixture.componentInstance.form.valid).toBe(true);
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="state"/>
    </form>
`
})
class TestComponent {
  form = new FormGroup({
    state: new FormControl(null, Validators.required)
  });
}
