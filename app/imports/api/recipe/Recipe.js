import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RecipesCollection. It encapsulates state and variable values for a recipe.
 */
class RecipesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RecipesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      image: String,
      date: Date,
      description: String,
      ingredients: Array, // chose to use array bc it allows the ingredients to be displayed easier/nicer
      'ingredients.$': String,
      instructions: Array, // chose to use array bc it allows the ingredients to be displayed easier/nicer
      'instructions.$': String,
      servings: Number,
      likes: {
        type: Number,
        defaultValue: 0,
      },
      mealType: {
        type: String,
        allowedValues: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
        defaultValue: 'Breakfast',
      },
      equipment: {
        type: String,
        allowedValues: ['Microwave', 'Oven', 'Stove', 'Rice cooker', 'Blender', 'None'],
        defaultValue: 'Microwave',
      },
      dietRestriction: {
        type: String,
        allowedValues: ['None', 'Vegan', 'Vegetarian', 'Lactose-free', 'Nut-free', 'Gluten-free'],
        defaultValue: 'None',
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RecipesCollection.
 * @type {RecipesCollection}
 */
export const Recipes = new RecipesCollection();
