import { BaasPage } from './app.po';

describe('baas App', () => {
  let page: BaasPage;

  beforeEach(() => {
    page = new BaasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
