import { HighFiveInsaPage } from './app.po';

describe('high-five-insa App', function() {
  let page: HighFiveInsaPage;

  beforeEach(() => {
    page = new HighFiveInsaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
