import { Selector } from 'testcafe';

class AllRecipesPage {
  constructor() {
    this.pageId = '#navbar-admin-dropdown-all-recipes';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
}

export const allRecipesPage = new AllRecipesPage();
