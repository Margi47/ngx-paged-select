import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    options$: any[] = [];
    selectedOption$: any;
    ngOnInit() {
        this.options$ = [
            {
                name: 'Option 1',
                value: 1
            },
            {
                name: 'Option 2',
                value: 2
            },
            {
                name: 'Option 3',
                value: 3
            },
            {
                name: 'Option 4',
                value: 4
            },
            {
                name: 'Option 5',
                value: 5
            },
            {
                name: 'Option 6',
                value: 6
            }
        ];
    }

    loadNextPage(page: number) {
        console.log(page);
        this.options$.push({
            name: 'Option 1 ' + page,
            value: 1
        },
            {
                name: 'Option 2' + page,
                value: 2
            },
            {
                name: 'Option 3' + page,
                value: 3
            });
    }

    search(value: string) {
        console.log(value);
        this.options$ = this.options$.filter(i => i.name.startsWith(value));
    }

    onSelect(option: any) {
        console.log(option.name);
        this.selectedOption$ = option;
    }
}
