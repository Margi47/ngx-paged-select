import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    options$: string[] = [];

    ngOnInit() {
        this.options$.push("one", "two", "three", "four", "five");
    }

    loadNextPage(page: number) {
        console.log(page);
        this.options$.push("one"+ page, "two"+ page, "three"+ page, "four"+ page, "five"+ page);
    }

    search(value: string) {
        console.log(value);
        this.options$ = this.options$.filter(i => i.startsWith(value));
    }
}
