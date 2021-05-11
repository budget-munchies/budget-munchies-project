import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Recipes } from '../../api/recipe/Recipe';
import { Vendors } from '../../api/vendor/Vendor';
import { Users } from '../../api/user/User';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the database with a default data document.
function addRecipe(recipe) {
  console.log(`  Adding: ${recipe.title} (${recipe.owner})`);
  Recipes.collection.insert(recipe);
}

// Initialize the database with a default vendors document.
function addVendors(vendor) {
  console.log(`  Adding: ${vendor.name} (${vendor.owner})`);
  Vendors.collection.insert(vendor);
}

// Initialize the database with a default profile document.
function addProfiles(user) {
  console.log(`  Adding: ${user.email})`);
  Users.collection.insert(user);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the RecipesCollection if empty.
if (Recipes.collection.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    console.log('Creating default recipes.');
    Meteor.settings.defaultRecipes.map(recipe => addRecipe(recipe));
  }
}

// Initialize the VendorsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendors.');
    Meteor.settings.defaultVendors.map(vendor => addVendors(vendor));
  }
}

// Initialize the ProfilesCollection if empty.
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(user => addProfiles(user));
  }
}
