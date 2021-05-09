import { Selector } from 'testcafe';

class ListRecipePage {
  constructor() {
    this.pageId = '#list-recipes-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 50 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(50000).expect(this.pageSelector.exists).ok();
  }
}

export const listRecipePage = new ListRecipePage();
