import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ContentChild, TemplateRef} from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'ngx-paged-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
    host: {
    '(document:click)': 'onOutsideClick($event)',
  },
})
export class SelectComponent implements OnInit{
    _options: any[];
    @Input() set options(value){
        if(value != null){
            this.loading = false;
            this._options = value;            
            if(this.rowHeight == undefined && this.selectOpened){
                setTimeout(()=>{ 
                    this.rowHeight = this.scroll.nativeElement.children[0]
                                        .getBoundingClientRect().height;
                    if(this.options.length < this.showNum){
                        this.height = this.rowHeight * this.options.length;
                    }
                    else{
                        this.height = this.rowHeight * this.showNum;
                    }
                    
                    this.scroll.nativeElement.children[this.optionIndex].scrollIntoView(true);
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
    
    @ContentChild(TemplateRef) tmpl: TemplateRef<any>;

    @ViewChild('scrollEl') scroll;
    @ViewChild('mainButton') mainButton;
    @ViewChild('searchInputEl') searchInput;
    @ViewChild('templates') optionTemplates;

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
    loading: boolean;

    constructor(private elementRef: ElementRef) {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {  
                this.optionIndex = 0;
                this.page = 1;
                this.loading = true;
                this.loadData.emit({ page: this.page, filter: data });                       
            });             
    }
    
    ngOnInit() {
        if (!this.showNum) {
            this.showNum = this.options.length;
        }   
    }

    onClickSelect() {
        if (!this.selectOpened) {
            this.selectOpened = true; 
            this.loading = true;          
            this.loadData.emit({page: this.page, filter: this.filter});            
            setTimeout(()=>{              
                this.searchInput.nativeElement.focus();
            }, 0);
        }
        else {
            this.searchInput.nativeElement.value = "";
            this.selectOpened = false;
            this.page = 1;
            this.filter = "";
            this.optionIndex = 0;
            this.mainButton.nativeElement.focus();
        }
    }

    onMouseOver(option) {
        this.optionIndex = this.options.indexOf(option);
    }
    
    onMainKeyDown(value:any){
        console.log(value);
        if (value.code == "Space"){            
            this.onClickSelect();
        }
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
    
   onOutsideClick(event) {
   if (!this.elementRef.nativeElement.contains(event.target) && this.selectOpened)
     this.onClickSelect();
  }
}