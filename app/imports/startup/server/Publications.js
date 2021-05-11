import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Recipes } from '../../api/recipe/Recipe';
import { Favorites } from '../../api/favorite/Favorite';
import { Vendors } from '../../api/vendor/Vendor';
import { Comments } from '../../api/comment/Comments';
import { Users } from '../../api/user/User';

// Everyone-level publication
Meteor.publish(Recipes.worldPublicationName, function () {
  return Recipes.collection.find();
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Users.collection.find({ email: username });
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Recipes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.collection.find({ owner: username });
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Favorites.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Users.adminPublicationName, function () {
  if (this.userId) {
    return Users.collection.find();
  }
  return this.ready();
});

// allows user/admin to see all Recipes in the database
// this is used in the browse recipe pages and the admin pages
Meteor.publish(Recipes.adminPublicationName, function () {
  if (this.userId) {
    return Recipes.collection.find();
  }
  return this.ready();
});

Meteor.publish(Favorites.adminPublicationName, function () {
  if (this.userId) {
    return Favorites.collection.find();
  }
  return this.ready();
});

// allows user/admin to see all Vendors in the database
// this is used in the ListVendors code
Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId) {
    return Vendors.collection.find();
  }
  return this.ready();
});

// allows anyone with an account to see all comments on Vendors in the database
Meteor.publish(Comments.adminPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
