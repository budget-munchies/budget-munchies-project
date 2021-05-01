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
      ingredients: String,
      instructions: String,
      servings: Number,
      likes: {
        type: Number,
        defaultValue: 0,
      },
      mealType: {
        type: String,
        allowedValues: ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'],
        defaultValue: 'breakfast',
      },
      equipment: {
        type: String,
        allowedValues: ['microwave', 'oven', 'stove', 'rice cooker', 'none'],
        defaultValue: 'microwave',
      },
      dietRestriction: {
        type: String,
        allowedValues: ['none', 'vegan', 'vegetarian', 'lactose-free', 'nut-free', 'gluten-free'],
        defaultValue: 'none',
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
