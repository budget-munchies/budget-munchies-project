import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listStuffPage } from './liststuff.page';
import { addStuffPage } from './addstuff.page';
import { editStuffPage } from './editstuff.page';
// eslint-disable-next-line import/named
import { addRecipePage } from './addrecipe.page';
import { adminPage } from './admin.page';

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
/* skipped because not needed */
test.skip('Test the List Stuff page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListStuffPage(testController);
  await listStuffPage.isDisplayed(testController);
});
/* skipped because not needed */
test.skip('Test the Add Stuff page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddStuffPage(testController);
  await addStuffPage.isDisplayed(testController);
});
/* skipped because not needed */
test.skip('Test the Edit Stuff page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditStuffPage(testController);
  await editStuffPage.isDisplayed(testController);
});

test('Test the Add Recipe page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddRecipePage(testController);
  await addRecipePage.isDisplayed(testController);
});

test('Test the admin page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adCredentials.username, adCredentials.password);
  await navBar.gotoAdminPage(testController);
  await adminPage.isDisplayed(testController);
});
