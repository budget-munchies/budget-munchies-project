import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(image, firstName, lastName, email, password, year, interests, bio, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    image: image,
    firstName: firstName,
    lastName: lastName,
    username: email,
    email: email,
    password: password,
    year: year,
    interests: interests,
    bio: bio,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ image, firstName, lastName, email, password, year, interests, bio, role }) => createUser(image, firstName, lastName, email, password, year, interests, bio, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
