import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
  DateField,
  ListField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipe/Recipe';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
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
    allowedValues: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
    defaultValue: 'Breakfast',
  },
  equipment: {
    type: String,
    allowedValues: ['Microwave', 'Oven', 'Stove', 'Rice cooker', 'Blender', 'None'],
    defaultValue: 'None',
  },
  dietRestriction: {
    type: String,
    allowedValues: ['None', 'Vegan', 'Vegetarian', 'Lactose-free', 'Nut-free', 'Gluten-free'],
    defaultValue: 'None',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, date, image, description, ingredients, instructions, mealType, equipment, dietRestriction, servings } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert({ title, date, image, description, ingredients, instructions, mealType, equipment, dietRestriction, servings, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Recipe added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    const btmarg = { marginBottom: '50px' };
    return (
      <Grid container id="add-recipe-page" centered>
        <Grid.Column>
          <Header as="h1" textAlign="center" style={headerStyle}>Add Recipe</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment style={btmarg}>
              <TextField name='title'/>
              <DateField name='date'/>
              <TextField name='image'/>
              <TextField name='description'/>
              <ListField name='ingredients'/>
              <ListField name='instructions'/>
              <NumField name='servings' decimal={false} min={0}/>
              <SelectField name='mealType'/>
              <SelectField name='equipment'/>
              <SelectField name='dietRestriction'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddRecipe;
