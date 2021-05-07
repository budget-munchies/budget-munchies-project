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
      date: Date,
      image: String,
      description: String,
      ingredients: Array,
      'ingredients.$': {
        type: String,
        label: 'ingredients',
        optional: false,
      },
      instructions: Array,
      'instructions.$': {
        type: String,
        label: 'instructions',
        optional: false,
      },
      servings: Number,
      mealType: {
        type: String,
        allowedValues: ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'],
        defaultValue: 'breakfast',
      },
      equipment: {
        type: String,
        allowedValues: ['microwave', 'oven', 'stove', 'rice cooker', 'blender', 'none'],
        defaultValue: 'microwave',
      },
      dietRestriction: {
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
