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
    return this.getSelectElement().all(by.css('dropdown-item'));
  }
  
  getSelectOptionsCount(){
    return this.getSelectOptions().count();
  }
  
  getFirstOption(){
    return this.getSelectOptions().get(0).getText();
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
    return function(){
                for (var index = 0; index < count; index++) {
                  this.getSelectInput().sendKeys(Key.ARROW_DOWN);                 
                }
            };
  }
  
  scrollPageDown(count: number){
    return function(){
                for (var index = 0; index < count; index++) {
                  this.getSelectInput().sendKeys(Key.PAGE_DOWN);                 
                }
            };
  }
  
}
