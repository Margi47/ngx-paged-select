import { browser, by, element, promise, ElementFinder, ElementArrayFinder, protractor,  ExpectedConditions, Key} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getSelectElement() {
    return element(by.tagName('ngx-paged-select'));
  }
  
  getSelectInput() {
    return this.getSelectElement().element(by.tagName('input'));
  }
  
  getSelectOptions(){
    return this.getSelectElement().all(by.css('.dropdown-item'));
  }
  
  getSelectOptionsCount(){
    return this.getSelectOptions().count();
  }
  
  getFirstOption(){
    return this.getSelectOptions().get(0).getText().then(x => x.toLowerCase());
  }
  
  getCurrentOptionIndex(){ 
     var i;
     var e = element(by.css(".active")).getText();  
     
     return this.getSelectOptions().each((el, index) =>{
      var option = el.getText();       
      promise.all([option,e]).then((values) => {
            if(values[0] == values[1]){ 
              i = index;
              return;
            }        
        })       
      }).then(() => {return i;}) 
  }
  
  getSelectResults(){
    return this.getSelectElement().all(by.css(".paged-select-result-label"));
  }
  
  getSelectResultsCount(){
    return this.getSelectResults().count();
  }
  
  getSelectResultText(index: number){
    return this.getSelectResults().get(index).getText();
  }
  
  deleteSelectResult(index: number){
    return element.all(by.css('.paged-select-delete-result-btn')).get(index).click();
  }
  
  getCityResult(){
    return element(by.id('city')).getText();
  }
  
  getCountryResult(){
    return element(by.id('country')).getText();
  }
  
  getPopulationResult(){
    return element(by.id('population')).getText();
  }
  
  scrollDown(count: number){
    for (var index = 0; index < count; index++) {
                  this.getSelectInput().sendKeys(Key.ARROW_DOWN);                 
                }
  }
  
  scrollPageDown(count: number){
    for (var index = 0; index < count; index++) {
                  this.getSelectInput().sendKeys(Key.PAGE_DOWN);                 
                }
  }
  
  performSearch(key: string){
    return this.getSelectInput().clear().then(() => this.getSelectInput().sendKeys(key));      
  }
  
  clearSearch(num:number){
  for (var index = 0; index < num; index++) {
        this.getSelectInput().sendKeys(Key.BACK_SPACE);      
      }  
  }
  
  clickMultipleCheckbox(){
    return element(by.id('multipleCheckbox')).click();
  }
  
  getTableRows(){
    return element(by.tagName('table')).element(by.tagName('tbody')).all(by.tagName('tr'));
  }
  
  getTableRowsCount(){
    return this.getTableRows().count();
  }
  
}
