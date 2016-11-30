import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {TypeaheadDirective} from './typeahead/typeahead.directive';
import {TypeaheadItemsComponent} from './typeahead/typeahead-items.component';

@NgModule({
  declarations: [
    AppComponent,
    TypeaheadDirective,
    TypeaheadItemsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
