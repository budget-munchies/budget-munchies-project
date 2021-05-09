import { Selector } from 'testcafe';

class ListStuffPage {
  constructor() {
    this.pageId = '#list-stuff-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 50 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(50000).expect(this.pageSelector.exists).ok();
  }
}

export const listStuffPage = new ListStuffPage();
