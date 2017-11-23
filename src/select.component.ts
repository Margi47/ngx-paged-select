import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewChecked, ViewChild, Renderer} from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'ngx-paged-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, AfterViewChecked{
    @Input() options: any[];
    @Input() hasMoreOptions: boolean;
    @Input() key: string;
    @Input() placeholder: string = "Select";
    @Input() showNum: number;
    
    _multiple: boolean;
    @Input() set multiple(value){
        this.resultOptions = [];
        this.placeholder = "Select";
        if(value != null){
            this._multiple = value;           
        }
        else{
            this._multiple = false;
        }
        
        if(this.selectOpened){
            this.onClickSelect();
        }
    }
    get multiple(){
        return this._multiple;
    }
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
    resultOptions: any[] = [];

    constructor(private renderer: Renderer) {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {  
                let elements = this.scroll.nativeElement.children;
                this.renderer.setElementClass(elements[this.optionIndex], 'active', false);
                this.optionIndex = 0;
                this.page = 1;
                this.loadData.emit({ page: this.page, filter: data });            
            });             
    }
    //temporary solution
    ngAfterViewChecked(){        
        if(this.optionIndex == 0){                  
            let elements = this.scroll.nativeElement.children;
            this.renderer.setElementClass(elements[this.optionIndex], 'active', true);
        }
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
                //checks if current element is not the last one
                if ((this.optionIndex + 1) < this.options.length) {
                    this.optionIndex++;
                    //checks the position of current element and decides whether next page is needed(2 items till the ned of list)
                    if (this.hasMoreOptions && this.optionIndex >= this.options.length - 1) { 
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
                //checks if current element is not the last one
                if ((this.optionIndex + 1) < this.options.length) {
                    //checks if this is a first element(to adjust index to numbers) -> setting new index
                    if(this.optionIndex == 0){
                        this.optionIndex += this.showNum -1;
                    }
                    else{
                        this.optionIndex += this.showNum;
                    }
                    //checks if a new page is needed
                    if(this.optionIndex >= this.options.length - 1){                                       
                        //checks if this is not the last page 
                        if (this.hasMoreOptions) {
                            this.onScrollDown();              
                        }
                        //last page and last elemant
                        else {
                            this.optionIndex = this.options.length - 1;
                        }
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
       this.page ++;           
       this.loadData.emit({ page: this.page, filter: this.filter });       
    }
    
    

    onOptionSelect(option: any) {
        if(!this.multiple){                                       
            this.resultOptions = [];
            this.resultOptions.push(option); 
            this.onClickSelect();
            this.optionSelected.emit(option);
        }
        else{
            if(this.resultOptions.indexOf(option) == -1 ){
                this.resultOptions.push(option);               
            }
            else{
                this.resultOptions = this.resultOptions.filter(x => x != option);
            }               
            this.searchInput.nativeElement.focus();     
            this.optionSelected.emit(this.resultOptions); 
        }      
    }
    
    deleteResult(option:any){
        if(this.multiple){
            this.resultOptions = this.resultOptions.filter(x => x != option);
            this.optionSelected.emit(this.resultOptions);
        }
        else{
            this.resultOptions = [];
            this.optionSelected.emit(null);
        }
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
