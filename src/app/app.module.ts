import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent
  ],
  imports: [
      BrowserModule,
      InfiniteScrollModule,
      NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
