import { Sample1Page } from './app.po';

describe('sample1 App', function() {
  let page: Sample1Page;

  beforeEach(() => {
    page = new Sample1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
