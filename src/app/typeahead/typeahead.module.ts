import {NgModule} from '@angular/core';
import {TypeaheadDirective} from './typeahead.directive';
import {TypeaheadBuilder} from './typeahead-builder';
import {TypeaheadItemsComponent} from './typeahead-items.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TypeaheadDirective,
    TypeaheadItemsComponent,
  ],
  providers: [
    TypeaheadBuilder,
  ],
  exports: [
    TypeaheadDirective,
    TypeaheadItemsComponent,
  ],
  entryComponents: [
    TypeaheadItemsComponent,
  ]
})
export class TypeaheadModule {}
