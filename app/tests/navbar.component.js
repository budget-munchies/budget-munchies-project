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

  /** Pull down login menu, go to ListStuff page. */
  async gotoListStuffPage(testController) {
    await testController.click('#navbar-list-stuff');
  }

  /** Pull down login menu, go to AddStuff page. */
  async gotoAddStuffPage(testController) {
    await testController.click('#navbar-add-stuff');
  }

  /** Pull down login menu, go to EditStuff page. */
  async gotoEditStuffPage(testController) {
    await testController.click('#navbar-edit-stuff');
  }

  /** Pull down login menu, go to AddStuff page. */
  async gotoAddRecipePage(testController) {
    await testController.click('#navbar-add-recipe');
  }

  /** Pull down login menu, go to liststuff page. */
  async gotoListRecipesPage(testController) {
    await testController.click('#navbar-list-recipes');
  }

  /** Pull down menu, go to breakfast page. */
  async gotoBreakfastPage(testController) {
    await testController.click('#navbar-dropdown');
    await testController.click('#navbar-dropdown-breakfast');
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
