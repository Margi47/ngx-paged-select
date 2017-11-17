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
            .then(() => page.scrollDown(3))
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
            .then(() => { expect(page.getFirstOption()).toContain("sa") });;
    })
});
