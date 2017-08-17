import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    options$: any[] = [];
    selectedOption$: any;
    hasMoreOptions: boolean;

    ngOnInit() {
        this.options$ = [
            {
                name: 'One',
                value: 1
            },
            {
                name: 'Two',
                value: 2
            },
            {
                name: 'Three',
                value: 3
            },
            {
                name: 'Four',
                value: 4
            },
            {
                name: 'Five',
                value: 5
            },
            {
                name: 'Six',
                value: 6
            }
        ];
        this.hasMoreOptions = true;
    }

    loadNextPage(data: any) {
        console.log(data);
        this.options$.push({
            name: 'One ' + data.page,
            value: 1
        },
            {
                name: 'Two ' + data.page,
                value: 2
            },
            {
                name: 'Three ' + data.page,
                value: 3
            });

        if (data.page == 40) {
            this.hasMoreOptions = false;
        }
    }

    search(value: string) {
        console.log(value);
        this.options$ = this.options$.filter(i => i.name.startsWith(value));
    }

    onSelect(option: any) {
        console.log(option);
        this.selectedOption$ = option;
    }
}
