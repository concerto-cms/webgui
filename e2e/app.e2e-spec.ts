import { ConcertoCmsWebguiPage } from './app.po';

describe('concerto-cms-webgui App', () => {
  let page: ConcertoCmsWebguiPage;

  beforeEach(() => {
    page = new ConcertoCmsWebguiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
