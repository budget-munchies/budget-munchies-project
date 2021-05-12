import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { addRecipePage } from './addrecipe.page';
import { allRecipesPage } from './allrecipes.page';
import { addVendorPage } from './addvendor.page';
import { breakfastPage } from './breakfast.page';
import { listRecipesPage } from './listrecipes.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('budget-munchies-project localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Add Recipe page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddRecipePage(testController);
  await addRecipePage.isDisplayed(testController);
});

test.skip('Test the List Recipe page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListRecipesPage(testController);
  await listRecipesPage.isDisplayed(testController);
});

test.skip('Test the breakfast page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBrowseRecipePage(testController);
  await breakfastPage.isDisplayed(testController);
});

test('Test the admin features', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adCredentials.username, adCredentials.password);
  await navBar.gotoAdminPage(testController);
  await allRecipesPage.isDisplayed(testController);
  await addVendorPage.isDisplayed(testController);
});
