import { AppPage } from './app.po';
import { browser, protractor,  ExpectedConditions, Key} from 'protractor';

describe('select-example App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

    it('should load new pages', () => {
        page.navigateTo()
            .then(() => page.getSelectElement.click())
            .then(() => { expect(page.getSelectOptionsCount().toEqual(10) }
            .then(() => page.scrollDown(3))
            .then(() => { expect(userListPage.getTableRowsCount()).toEqual(0) });
    })

    it('should accept user search input and implement search', () => {
        userListPage.navigateToList()
            .then(() => userListPage.performSearch("na"))//wait
            .then(() => { expect(userListPage.getFirstRowName()).toContain("na") })
            .then(() => userListPage.performSearch("to"))//wait
            .then(() => { expect(userListPage.getFirstRowName()).toContain("to") })
            .then(() => userListPage.performSearch("ndgrenaifnvfdlkv"))//wait
            .then(() => { expect(userListPage.getTableRowsCount()).toEqual(0) });
    })

    

});
