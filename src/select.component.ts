import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'ngx-paged-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit{
    _options: any[];
    @Input() set options(value){
        if(value != null){
            this._options = value;
            
            if(this.rowHeight == undefined){
                setTimeout(()=>{ 
                    this.rowHeight = this.scroll.nativeElement.children[0]
                                        .getBoundingClientRect().height;
                    if(this.options.length < this.showNum){
                        this.height = this.rowHeight * this.options.length;
                    }
                    else{
                        this.height = this.rowHeight * this.showNum;
                    }
                    setTimeout(() => {
                        let rect = this.scroll.nativeElement.getBoundingClientRect();
                        this.topPosition = rect.top;
                        this.bottomPosition = rect.bottom;
                        },0);
                }, 0);
            }
            else{                  
                if(value.length < this.showNum){
                    this.height = this.rowHeight * value.length;
                }
                else{
                    this.height = this.rowHeight * this.showNum;
                }
            }  
        }      
    }
    get options(){
        return this._options;
    }
    @Input() hasMoreOptions: boolean;
    @Input() key: string;
    @Input() placeholder: string = "Select";
    @Input() showNum: number;
    
    _multiple: boolean;
    @Input() set multiple(value){
        this.resultOptions = [];
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
    height: number;
    resultOptions: any[] = [];

    constructor() {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {  
                this.optionIndex = 0;
                this.page = 1;
                this.loadData.emit({ page: this.page, filter: data });            
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
            this.loadData.emit({page: 1, filter: ""});
        }
        else {
            this.optionIndex = 0;
            elements[this.optionIndex].scrollIntoView(true);
            this.page = 1;
            this.filter = "";
            this.selectOpened = false;
        }
    }

    onMouseOver(option) {
        this.optionIndex = this.options.indexOf(option);
    }

    onKeyDown(value: any) {
        let elements = this.scroll.nativeElement.children;
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