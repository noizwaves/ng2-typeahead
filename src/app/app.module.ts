import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {TypeaheadDirective} from './typeahead/typeahead.directive';
import {TypeaheadItemsComponent} from './typeahead/typeahead-items.component';
import {TypeaheadModule} from './typeahead/typeahead.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    TypeaheadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
