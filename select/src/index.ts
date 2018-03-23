import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export * from './select.component';

@NgModule({
  imports: [
    BrowserModule, InfiniteScrollModule
  ],
  declarations: [
    SelectComponent
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
