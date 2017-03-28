import { Porfolio1Page } from './app.po';

describe('porfolio1 App', () => {
  let page: Porfolio1Page;

  beforeEach(() => {
    page = new Porfolio1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
