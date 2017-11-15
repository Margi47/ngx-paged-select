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
    @Output() loadData = new EventEmitter<any>();
    @Output() optionSelected = new EventEmitter<any>();

    @ViewChild('dropdownEl') dropdown;
    @ViewChild('dropdownMenuEl') dropdownMenu;
    @ViewChild('dropdownItemEl') dropdownItem;
    @ViewChild('scrollEl') scroll;
    @ViewChild('mainButton') mainButton;
    @ViewChild('searchInputEl') searchInput;

    public search = new Subject<string>();

    topPosition: number;
    bottomPosition: number;
    rowHeight: number;
    page: number = 1;
    filter: string = "";
    selectOpened: boolean = false;
    optionIndex: number = 0;

    constructor(private renderer: Renderer) {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {
                this.loadData.emit({ page: 1, filter: data });
            });
    }

    ngOnInit() {
        if (!this.showNum) {
            this.showNum = this.options.length;
        }
    }

    onClickSelect() {
        let elements = this.scroll.nativeElement.children;
        if (!this.selectOpened) {
            this.selectOpened = true;
            this.renderer.setElementClass(this.dropdown.nativeElement, 'show', true);
            this.renderer.setElementClass(this.dropdownMenu.nativeElement, 'show', true);

            this.rowHeight = elements[0].getBoundingClientRect().height;

            this.renderer.setElementStyle(this.scroll.nativeElement, 'height',
                (this.rowHeight * this.showNum).toString() + 'px');

            let rect = this.scroll.nativeElement.getBoundingClientRect();
            this.topPosition = rect.top;
            this.bottomPosition = rect.bottom;

            this.renderer.setElementClass(elements[this.optionIndex], 'active', true);
            this.searchInput.nativeElement.focus();
        }
        else {
            this.renderer.setElementClass(elements[this.optionIndex], 'active', false);
            this.optionIndex = 0;
            elements[this.optionIndex].scrollIntoView(true);
            this.page = 1;
            this.filter = "";

            this.selectOpened = false;
            this.renderer.setElementClass(this.dropdown.nativeElement, 'show', false);
            this.renderer.setElementClass(this.dropdownMenu.nativeElement, 'show', false);
            this.mainButton.nativeElement.focus();

        }
    }

    onMouseOver(option) {
        let elements = this.scroll.nativeElement.children;
        this.renderer.setElementClass(elements[this.optionIndex], 'active', false);
        this.optionIndex = this.options.indexOf(option);
        this.renderer.setElementClass(elements[this.optionIndex], 'active', true);
    }

    onKeyDown(value: any) {
        let elements = this.scroll.nativeElement.children;
        this.renderer.setElementClass(elements[this.optionIndex], 'active', false);

        switch (value.key) {
            case "ArrowDown": {
                if (this.hasMoreOptions || (this.optionIndex + 1) < this.options.length) {

                    this.optionIndex++;

                    if (this.hasMoreOptions && this.optionIndex == this.options.length - 2) {
                        this.onScrollDown();
                    }

                    let curElement = elements[this.optionIndex].getBoundingClientRect();

                    if (curElement.bottom > this.bottomPosition) {
                        elements[this.optionIndex].scrollIntoView(false);
                    }
                }

                break;
            }
            case "ArrowUp": {
                if (this.optionIndex != 0) {

                    this.optionIndex--;

                    let curElement = elements[this.optionIndex].getBoundingClientRect();
                    if (curElement.top < this.topPosition) {
                        elements[this.optionIndex].scrollIntoView(true);
                    }
                }
                break;
            }
            case "Enter": {
                this.onOptionSelect(this.options[this.optionIndex]);
                break;
            }
            case "PageDown": {
                if (this.hasMoreOptions || (this.optionIndex != this.options.length - 1)) {
                    if (this.hasMoreOptions || (this.optionIndex < this.options.length - this.showNum)) {
                        this.optionIndex += this.showNum;

                        if (this.hasMoreOptions && this.optionIndex >= this.options.length - 2) {
                            this.onScrollDown();
                        }
                    }
                    else {
                        this.optionIndex = this.options.length - 1;
                    }

                    if (this.optionIndex > elements.length-1) {
                        this.optionIndex = elements.length-1;
                    }

                    elements[this.optionIndex].scrollIntoView(false);
                }
                break;
            }
            case "PageUp": {
                if (this.optionIndex != 0) {
                    if (this.optionIndex >= this.showNum) {
                        this.optionIndex -= this.showNum;
                    }
                    else {
                        this.optionIndex = 0;
                    }
                    elements[this.optionIndex].scrollIntoView(true);
                }
                break;
            }
            case "Escape": {
                this.onClickSelect();
                return;
            }
        }

        this.renderer.setElementClass(elements[this.optionIndex], 'active', true);
    }

    onScrollDown() {
        this.page++;
        if (this.hasMoreOptions) {
            this.loadData.emit({ page: this.page, filter: this.filter });
        }       
    }

    onOptionSelect(option: any) {
        this.optionSelected.emit(option);
        this.placeholder = this.getOptionLabel(option);
        this.onClickSelect();
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
