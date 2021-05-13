import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { addRecipePage } from './addrecipe.page';
import { allRecipesPage } from './allrecipes.page';
import { addVendorPage } from './addvendor.page';
import { breakfastPage } from './breakfast.page';
import { listRecipesPage } from './listrecipes.page';
import { userPagePage } from './userpage.page';
import { listVendorsPage } from './listvendors.page';
import { favoriteRecipesPage } from './favoriterecipes.page';
import { lunchPage } from './lunch.page';
import { dinnerPage } from './dinner.page';
import { dessertPage } from './dessert.page';
import { snackPage } from './snack.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('budget-munchies-project localhost test with default db')
  .page('http://localhost:3000');
/* Landing page test */
test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});
/* sign in page test */
/* sign out page test */
test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
/* add recipe page test */
test('Test the Add Recipe page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddRecipePage(testController);
  await addRecipePage.isDisplayed(testController);
});
/* List recipe page test */
test('Test the List Recipe page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListRecipesPage(testController);
  await listRecipesPage.isDisplayed(testController);
});

/* List vendors page test */
test('Test the List Vendors page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorsPage(testController);
  await listVendorsPage.isDisplayed(testController);
});

/* user profile page test */
test('Test the User Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserPagePage(testController);
  await userPagePage.isDisplayed(testController);
});

/* favorites page test */
test('Test the favorites page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoFavoriteRecipesPage(testController);
  await favoriteRecipesPage.isDisplayed(testController);
});

/* meal pages test */
test('Test the breakfast page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBreakfastPage(testController);
  await breakfastPage.isDisplayed(testController);
});

/* meal pages test */
test('Test the lunch page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoLunchPage(testController);
  await lunchPage.isDisplayed(testController);
});

/* meal pages test */
test('Test the dinner page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDinnerPage(testController);
  await dinnerPage.isDisplayed(testController);
});

/* meal pages test */
test('Test the dessert page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDessertPage(testController);
  await dessertPage.isDisplayed(testController);
});

/* meal pages test */
test('Test the snack page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSnackPage(testController);
  await snackPage.isDisplayed(testController);
});

/* admin features test */
test('Test the admin features', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adCredentials.username, adCredentials.password);
  await navBar.gotoAdminPage(testController);
  await allRecipesPage.isDisplayed(testController);
  await addVendorPage.isDisplayed(testController);
});
