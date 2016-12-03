import {Directive, OnInit, Input, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TypeaheadStrategy} from './typeahead-strategy';
import {Subscription} from 'rxjs/Rx';

@Directive({
  selector: '[typeahead]'
})
export class TypeaheadDirective implements OnInit, OnDestroy {
  @Input('typeahead') strategy: TypeaheadStrategy;
  @Input('formControl') formControl: FormControl;

  private subscription: Subscription = null;

  ngOnInit(): void {
    if (!this.strategy) {
      throw '"strategy" input is required for typeahead';
    }

    if (!this.formControl) {
      throw '"formControl" input is required for typeahead';
    }

    this.subscription = this.formControl.valueChanges.subscribe(v => this.strategy.setQuery(v));
  }

  ngOnDestroy(): void {
    if (!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
