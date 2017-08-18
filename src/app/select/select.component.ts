import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
    @Input() options: any[];
    @Input() hasMoreOptions: boolean;
    @Input() key: string;
    @Input() placeholder: string = "Select";
    @Input() showNum: number;
    @Output() onScroll = new EventEmitter<any>();
    @Output() onSearch = new EventEmitter<string>();
    @Output() optionSelected = new EventEmitter<any>();

    @ViewChild('dropdownEl') dropdown;
    @ViewChild('dropdownMenuEl') dropdownMenu;
    @ViewChild('dropdownItemEl') dropdownItem;
    @ViewChild('scrollEl') scroll;

    public search = new Subject<string>();

    page: number = 1;
    filter: string = "";
    selectOpened: boolean = false;
    optionIndex: number = 0;

    constructor(private renderer: Renderer) {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {
                this.onSearch.emit(data);
            });
    }

    ngOnInit() {
        if (!this.showNum) {
            this.showNum = this.options.length;
        }
        this.renderer.setElementStyle(this.scroll.nativeElement, 'height', (31.4667 * this.showNum).toString() + 'px');
    }

    onOpenSelect() {
        if (!this.selectOpened) {
            this.selectOpened = true;
            this.renderer.setElementClass(this.dropdown.nativeElement, 'show', true);
            this.renderer.setElementClass(this.dropdownMenu.nativeElement, 'show', true);
            this.renderer.setElementClass(this.dropdownMenu.nativeElement.children[1].children[this.optionIndex], 'dropdown-item-highlighted', true);
            
        }
        else {
            this.selectOpened = false;
            this.renderer.setElementClass(this.dropdown.nativeElement, 'show', false);
            this.renderer.setElementClass(this.dropdownMenu.nativeElement, 'show', false);
        }
    }

    onKeyDown(value: any) {
        this.renderer.setElementClass(this.dropdownMenu.nativeElement.children[1].children[this.optionIndex], 'dropdown-item-highlighted', false);

        if (value.key == "ArrowDown") {
            console.log(value);
            this.optionIndex++;
        }

        if (value.key == "ArrowUp") {
            console.log(value);
            this.optionIndex--;
        }

        this.renderer.setElementClass(this.dropdownMenu.nativeElement.children[1].children[this.optionIndex], 'dropdown-item-highlighted', true);
    }

    onScrollDown(event: any) {
        this.page++;
        if (this.hasMoreOptions) {
            this.onScroll.emit({ page: this.page, filter: this.filter });
        }       
    }

    onOptionSelect(option: any) {
        this.optionSelected.emit(option);
        //this.onOpenSelect();
    }

    filterItem(value: any) {
        this.onSearch.emit(value);
    }

    getOptionLabel(option: any): string {
        if (this.key) {
            if (option[this.key]) {
                return option[this.key];
            }
        }
        return option;
    }
}
