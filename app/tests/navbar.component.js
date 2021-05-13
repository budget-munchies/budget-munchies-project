import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** go to AddRecipe page. */
  async gotoAddRecipePage(testController) {
    await testController.click('#navbar-add-recipe');
  }

  /** go to listrecipes page. */
  async gotoListRecipesPage(testController) {
    await testController.click('#navbar-list-recipes');
  }

  /** go to listvendors page. */
  async gotoListVendorsPage(testController) {
    await testController.click('#navbar-list-vendors');
  }

  /** Pull down menu, go to breakfast page. */
  async gotoBreakfastPage(testController) {
    await testController.expect(Selector('#navbar-user-dropdown').exists).ok();
    await testController.click('#navbar-user-dropdown');
    await testController.click('#navbar-dropdown-breakfast');
  }

  /** Pull down menu, go to lunch page. */
  async gotoLunchPage(testController) {
    await testController.expect(Selector('#navbar-user-dropdown').exists).ok();
    await testController.click('#navbar-user-dropdown');
    await testController.click('#navbar-dropdown-lunch');
  }

  /** Pull down menu, go to lunch page. */
  async gotoDinnerPage(testController) {
    await testController.expect(Selector('#navbar-user-dropdown').exists).ok();
    await testController.click('#navbar-user-dropdown');
    await testController.click('#navbar-dropdown-dinner');
  }

  /** Pull down menu, go to desserts page. */
  async gotoDessertPage(testController) {
    await testController.expect(Selector('#navbar-user-dropdown').exists).ok();
    await testController.click('#navbar-user-dropdown');
    await testController.click('#navbar-dropdown-dessert');
  }

  /** Pull down menu, go to snacks page. */
  async gotoSnackPage(testController) {
    await testController.expect(Selector('#navbar-user-dropdown').exists).ok();
    await testController.click('#navbar-user-dropdown');
    await testController.click('#navbar-dropdown-snacks');
  }

  /** user page */
  async gotoUserPagePage(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#login-dropdown-profile');
  }

  /** favorites */
  async gotoFavoriteRecipesPage(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#login-dropdown-favorites');
  }

  /** sign in and go to admin features */
  async gotoAdminPage(testController) {
    await testController.click('#navbar-admin-dropdown');
    await testController.click('#navbar-admin-dropdown-all-recipes');
    await testController.click('#navbar-admin-dropdown');
    await testController.click('#navbar-admin-dropdown-add-vendor');
  }
}
export const navBar = new NavBar();
