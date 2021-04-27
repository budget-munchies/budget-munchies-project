import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listStuffPage } from './liststuff.page';
import { addStuffPage } from './addstuff.page';
import { editStuffPage } from './editstuff.page';
// import { notFoundPage } from './notfound.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

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

test('Test the List Stuff page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListStuffPage(testController);
  await listStuffPage.isDisplayed(testController);
  await listStuffPage.hasTable(testController);
});

test('Test the Add Stuff page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddStuffPage(testController);
  await addStuffPage.isDisplayed(testController);
});

test('Test the Edit Stuff page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditStuffPage(testController);
  await editStuffPage.isDisplayed(testController);
});

// test('Test that not found page shows up', async (testController) => {
// await notFoundPage.isDisplayed(testController);
// });
