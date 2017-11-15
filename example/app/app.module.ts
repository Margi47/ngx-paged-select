import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { SelectModule } from 'ngx-paged-select';
import { SelectComponent } from '../../src/select.component'
import { AppComponent } from './app.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll'

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule
    //SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
