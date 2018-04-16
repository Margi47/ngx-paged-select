[![npm](https://img.shields.io/npm/v/ngx-paged-select.svg)](https://www.npmjs.com/package/ngx-paged-select)
[![npm](https://img.shields.io/npm/dt/ngx-paged-select.svg)](https://www.npmjs.com/package/ngx-paged-select)
[![Travis](https://img.shields.io/travis/Margi47/ngx-paged-select.svg)](https://www.npmjs.com/package/ngx-paged-select)


# ngx-paged-select
A simple select component for Angular 4 with scrolling and paging features.

## Installation

To install this library, run:

```bash
$ npm install ngx-paged-select --save
```
## Prerequisites

You will need [ngx-infinite-scroll](https://github.com/orizens/ngx-infinite-scroll)

```bash
$ npm install ngx-infinite-scroll --save
```
and [Bootstrap](https://getbootstrap.com/) styles

```bash
$ npm install bootstrap --save
```
```html
<!--- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
```

## Consuming library

You can import library in any Angular application by running:

```bash
$ npm install ngx-paged-select
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import library
import { SelectModule } from 'ngx-paged-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify library as an import
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once library is imported, you can use it in your Angular application:

```xml
<!-- You can now use select component with default template in app.component.html -->
<ngx-paged-select [options]="options$"
                  [hasMoreOptions]="hasMoreOptions"
                  [key]="'name'"
                  [placeholder]="'Select Me'"
                  [showNum]="5"
                  [multiple]="true"
                  (loadData)="loadNextPage($event)"
                  (optionSelected)="onSelect($event)"></ngx-paged-select>
```

```xml
<!-- Or with custom template -->
<ngx-paged-select [options]="options$"
                  [hasMoreOptions]="hasMoreOptions"
                  (loadData)="loadNextPage($event)"
                  (optionSelected)="onSelect($event)">
  
    <!-- Template for options to select from -->
    <ng-template let-option option>
        <img src={{option.logo}}/>
    </ng-template>
  
    <!-- Template for chosen elements -->
    <ng-template let-result result>
        <img src={{result.logo}}/>
    </ng-template>
</ngx-paged-select>
```

## Supported API

### Properties
- options: array - Array of options to select from. If an array consists of complex objects, key property is needed.
- hasMoreOptions: boolean - Set to true, if current page is not the last one.
- key: string - (optional in case of simple types) - Indicates a property of a complex object, that needs to be displayed.
- placeholder: string - (default: "Select") - Text to display, when no element chosen.
- showNum: number - (default: length of first page) - Number of options visible in select window.
- multiple: boolean - (default: false) - Allows to select multiple options.

### Events
- loadData - Fires when new page needed or search input occured. Returns object with **page:number** and **filter:string** properties.
- optionSelected - Fires when option has been selected. Returns the entire option object or an array of option objects in case of *multiple* attribute set to true.

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

To run example:

```bash
$ npm run playground
```

## License

MIT © [Margarita Liapustina](mailto:Margi47@users.noreply.github.com)
