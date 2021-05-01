import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
  LongTextField,
  DateField,
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
  ingredients: String,
  instructions: String,
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
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    const btmarg = { marginBottom: '25px' };
    return (
      <Grid container id="add-recipe-page" centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" style={headerStyle}>Add Recipe</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment style={btmarg}>
              <TextField name='title'/>
              <DateField name='date'/>
              <TextField name='image'/>
              <TextField name='description'/>
              <LongTextField name='ingredients'/>
              <LongTextField name='instructions'/>
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
