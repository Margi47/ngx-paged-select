import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SelectModule } from 'ngx-paged-select';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        InfiniteScrollModule,
        SelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
