import { SelectComponentPage } from './app.po';

describe('select-component App', () => {
  let page: SelectComponentPage;

  beforeEach(() => {
    page = new SelectComponentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
