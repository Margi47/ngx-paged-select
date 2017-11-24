import { AppPage } from './app.po';
import { browser, protractor,  ExpectedConditions, Key} from 'protractor';

describe('select-example App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

    it('should load new pages with KeyDown', () => {
        page.navigateTo()
            .then(() => page.getSelectElement().click())
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(10) })
            .then(() => { expect(page.getCurrentOptionIndex()).toEqual(0) })
            .then(() => page.scrollDown(5))
            .then(() => { expect(page.getCurrentOptionIndex()).toEqual(5) })
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(10) })
            .then(() => page.scrollDown(4))
            .then(() => { expect(page.getCurrentOptionIndex()).toEqual(9) })
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(20) });
    })
    
    it('should load new pages with PageDown', () => {
        page.navigateTo()
            .then(() => page.getSelectElement().click())
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(10) })
            .then(() => page.scrollPageDown(1))
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(10) })
            .then(() => page.scrollPageDown(1))
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(20) })
            .then(() => page.scrollPageDown(2))
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(30) });
    })

    it('should accept search input and implement search', () => {
        page.navigateTo()
            .then(() => page.getSelectElement().click())
            .then(() => page.performSearch("bu"))
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(2) })
            .then(() => { expect(page.getFirstOption()).toContain("bu") })
            .then(() => page.performSearch("sa"))
            .then(() => { expect(page.getSelectOptionsCount()).toEqual(2) })
            .then(() => { expect(page.getFirstOption()).toContain("sa") });
    })
    
    it("should show correct results of single selection", () => {
        page.navigateTo()
            .then(() => page.getSelectElement().click())
            .then(() => page.performSearch("bu"))
            .then(() => page.scrollDown(1))
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))
            .then(() => { expect(page.getCityResult()).toEqual("Budapest") })
            .then(() => { expect(page.getCountryResult()).toEqual("Hungary") })
            .then(() => { expect(page.getPopulationResult()).toEqual("1,759,407") })
            .then(() => { expect(page.getSelectResultsCount()).toEqual(1) })
            .then(() => { expect(page.getSelectResultText(0)).toEqual("Budapest") })
            .then(() => page.getSelectElement().click())
            .then(() => page.clearSearch(2))
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))           
            .then(() => { expect(page.getCityResult()).toEqual("Istanbul") })
            .then(() => { expect(page.getSelectResultsCount()).toEqual(1) })
            .then(() => { expect(page.getSelectResultText(0)).toEqual("Istanbul") });
    })
    
    it("should delete result of single selection", () =>{
        page.navigateTo()
            .then(() => page.getSelectElement().click())
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))
            .then(() => { expect(page.getSelectResultsCount()).toEqual(1) })
            .then(() => { expect(page.getSelectResultText(0)).toEqual("Istanbul") })
            .then(() => page.deleteSelectResult(0))
            .then(() => { expect(page.getSelectResultsCount()).toEqual(0) });
    })
    
    it("should reset selected index after each seach input", () => {
        page.navigateTo()
            .then(() => page.getSelectElement().click())
            .then(() => page.scrollDown(3))
            .then(() => { expect(page.getCurrentOptionIndex()).toEqual(3) })
            .then(() => page.performSearch("bu"))
            .then(() => { expect(page.getCurrentOptionIndex()).toEqual(0) });
    })
    
    it("should show correct results of multiple selection", () => {
        page.navigateTo()
            .then(() => page.clickMultipleCheckbox())
            .then(() => page.getSelectElement().click())           
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))
            .then(() => page.scrollDown(1))
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))
            .then(() => { expect(page.getSelectResultsCount()).toEqual(2) })           
            .then(() => { expect(page.getTableRowsCount()).toEqual(2) })
            .then(() => { expect(page.getSelectResultText(0)).toEqual("Istanbul") })
            .then(() => { expect(page.getSelectResultText(1)).toEqual("Moscow") })
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))
            .then(() => { expect(page.getSelectResultsCount()).toEqual(1) })           
            .then(() => { expect(page.getTableRowsCount()).toEqual(1) });
    })
    
    it("should delete result of multiple selection", () =>{
        page.navigateTo()
            .then(() => page.clickMultipleCheckbox())
            .then(() => page.getSelectElement().click())          
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))
            .then(() => page.scrollDown(1))
            .then(() => page.getSelectInput().sendKeys(Key.ENTER))
            .then(() => { expect(page.getSelectResultsCount()).toEqual(2) })
            .then(() => page.deleteSelectResult(0))
            .then(() => { expect(page.getSelectResultsCount()).toEqual(1) });
    })
});
