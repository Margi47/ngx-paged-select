import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
    @Input() options: any[];
    @Input() total: number;
    @Input() key: string;
    @Input() placeholder: string = "Select";
    @Input() showNum: number;
    @Output() onScroll = new EventEmitter<number>();
    @Output() onSearch = new EventEmitter<string>();
    @Output() optionSelected = new EventEmitter<any>();

    @ViewChild('dropdownEl') dropdown;
    @ViewChild('dropdownMenuEl') dropdownMenu;

    constructor(private renderer: Renderer) { }

    ngOnInit() {
        console.log(this.options);
        if (!this.showNum) {
            this.showNum = this.options.length;
        }
        console.log(this.showNum);
        this.renderer.setElementStyle(this.dropdownMenu.nativeElement, 'height', (100 * this.showNum).toString()+'%');
    }

    visible: boolean = false;
    page: number = 1;
    selectOpened: boolean = false;

    onOpenSelect() {
        if (!this.selectOpened) {
            this.selectOpened = true;
            this.renderer.setElementClass(this.dropdown.nativeElement, 'show', true);
            this.renderer.setElementClass(this.dropdownMenu.nativeElement, 'show', true);
        }
        else {
            this.selectOpened = false;
            this.renderer.setElementClass(this.dropdown.nativeElement, 'show', false);
            this.renderer.setElementClass(this.dropdownMenu.nativeElement, 'show', false);
        }
    }

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
