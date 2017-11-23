# ngx-paged-select
A simple select component for Angular 4 with scrolling and paging features.

## Installing
To install this library, run:
```
$ npm install ngx-paged-select --save
```

## Prerequisites

You will need [ngx-infinite-scroll](https://pages.github.com/)

```
npm install ngx-infinite-scroll --save
```
and [Bootstrap](https://getbootstrap.com/) styles
```
<!--- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet">
```

## Usage

Import select to you aplication module

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppComponent } from './app.component';
 
import { SelectModule } from 'ngx-paged-select';
 
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,SelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Add component to your template

```
<ngx-paged-select [options]="options$"
                  [hasMoreOptions]="hasMoreOptions"
                  [key]="'name'"
                  [placeholder]="'Select Me'"
                  [showNum]="5"
                  (loadData)="loadNextPage($event)"
                  (optionSelected)="onSelect($event)"></ngx-paged-select>
```

## Supported API

###Properties
- options: array - Array of options to select from. If an array consists of complex objects, key property is needed.
- hasMoreOptions: boolean - Set to true, if current page is not the last one.
- key: string - (optional in case of simple types) - Indicates a property of a complex object, that needs to be displayed.
- placeholder: string - (default: "Select") - Text to display, when no element chosen.
- showNum: number - (default: length of first page) - Number of options visible in select window.

###Events
- loadData - Fires when new page needed or search input occured. Returns object with **page:number** and **filter:string** properties.
- optionSelected - Fires when option has been selected. Returns the entire option object.

## Running the tests
Download the repository and run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
