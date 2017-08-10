import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
    @Input() options: string[];
    @Input() total: number;
    @Output() onScroll = new EventEmitter<number>();
    @Output() onSearch = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
        console.log(this.options);
    }

    visible: boolean = false;
    page: number = 1;

    onScrollDown(event: any) {
        this.page++;
        if (this.page <= this.total) {
            this.onScroll.emit(this.page);
        }
        
    }

    onOptionSelect(option: string) {
        console.log(option);
    }

    filterItem(value: any) {
        this.onSearch.emit(value);
    }
}
