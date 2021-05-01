import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Recipes } from '../../api/recipe/Recipe.js';
import { Favorites } from '../../api/favorite/Favorite.js';

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

// Initialize the database with a default data document.
function addFavorite(recipe) {
  console.log(`  Adding: ${recipe.title} (${recipe.owner})`);
  Favorites.collection.insert(recipe);
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

// Initialize the RecipesCollection if empty.
if (Favorites.collection.find().count() === 0) {
  if (Meteor.settings.defaultFavorites) {
    console.log('Creating default recipes.');
    Meteor.settings.defaultFavorites.map(recipe => addFavorite(recipe));
  }
}
