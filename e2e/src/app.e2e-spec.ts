import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Get Tezos Transaction List');
  });

  it('should have table HTML element', () => {
    page.navigateTo();
    const table = element.all(by.css('.table'));
    expect(table.count()).toBeGreaterThan(0);
  });

  it('should have 10 transactions at start', async () => {
    page.navigateTo();
    const rowsSelector = 'table tbody tr';
    expect(element.all(by.css(rowsSelector)).count()).toBe(10);
  });

});
