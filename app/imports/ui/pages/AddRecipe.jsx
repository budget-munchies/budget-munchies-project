import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipe/Recipe';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  image: String,
  ingredients: String,
  instructions: String,
  servings: Number,
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
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, image, ingredients, instructions, mealType, equipment, dietRestrictions, servings } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert({ title, image, ingredients, instructions, mealType, equipment, dietRestrictions, servings, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Recipe</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='title'/>
              <TextField name='image'/>
              <LongTextField name='ingredients'/>
              <LongTextField name='instructions'/>
              <NumField name='servings' decimal={false} min={0} />
              <SelectField name='mealType'/>
              <SelectField name='equipment'/>
              <SelectField name='dietRestrictions'/>
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
