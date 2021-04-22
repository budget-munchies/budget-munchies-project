import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RecipesCollection. It encapsulates state and variable values for stuff.
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
      ingredients: String,
      instructions: String,
      servings: Number,
      likes: Number,
      mealType: {
        type: String,
        allowedValues: ['breakfast', 'lunch', 'dinner', 'dessert'],
        defaultValue: 'breakfast',
      },
      equipment: {
        type: String,
        allowedValues: ['microwave', 'oven', 'stove', 'rice cooker'],
        defaultValue: 'microwave',
      },
      dietRestrictions: {
        type: String,
        allowedValues: ['none', 'vegan', 'vegetarian', 'lactose-free', 'nut-free', 'gluten-free'],
        defaultValue: 'none',
      },
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
