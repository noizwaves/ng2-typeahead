import {
  Directive,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TypeaheadStrategy} from './typeahead-strategy';
import {Subscription} from 'rxjs/Rx';
import {TypeaheadItemsComponent} from './typeahead-items.component';

@Directive({
  selector: '[typeahead]'
})
export class TypeaheadDirective implements OnInit, OnDestroy {
  @Input('typeahead') strategy: TypeaheadStrategy;
  @Input('formControl') formControl: FormControl;

  private subscription: Subscription = null;

  constructor(private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    if (!this.strategy) {
      throw '"strategy" input is required for typeahead';
    }

    if (!this.formControl) {
      throw '"formControl" input is required for typeahead';
    }

    this.subscription = this.formControl.valueChanges.subscribe(v => this.strategy.setQuery(v));

    if (!this.hasItemsComponentAttached()) {
      this.attachItemsComponent();
    }

    this.strategy.selectedItem.subscribe(value => this.formControl.setValue(value.value));
  }

  ngOnDestroy(): void {
    if (!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private hasItemsComponentAttached() {
    return this.elementRef.nativeElement.nextElementSibling !== null &&
      this.elementRef.nativeElement.nextElementSibling.tagName === 'TYPEAHEAD-ITEMS';
  }

  private attachItemsComponent() {
    let originalSibling = this.elementRef.nativeElement.nextElementSibling;

    let cf = this.componentFactoryResolver.resolveComponentFactory(TypeaheadItemsComponent);

    let componentRef = this.viewContainerRef.createComponent(cf);
    componentRef.instance.strategy = this.strategy;

    this.elementRef.nativeElement.parentElement.insertBefore(componentRef.location.nativeElement, originalSibling);
  }
}
