import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
    @Input() options: any[];
    @Input() total: number;
    @Input() key: string;
    @Output() onScroll = new EventEmitter<number>();
    @Output() onSearch = new EventEmitter<string>();
    @Output() optionSelected = new EventEmitter<any>();

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

    onOptionSelect(option: any) {
        this.optionSelected.emit(option);
    }

    filterItem(value: any) {
        this.onSearch.emit(value);
    }

    getOptionLabel(option: any): string {
        console.log(this.key + option);
        if (this.key) {
            if (option[this.key]) {
                return option[this.key];
            }
        }
        return option;
    }
}
