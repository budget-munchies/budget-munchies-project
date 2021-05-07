import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  NumField,
  HiddenField,
  SelectField,
  SubmitField,
  TextField,
  DateField,
  ListField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';

const bridge = new SimpleSchema2Bridge(Recipes.schema);

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, description, image, ingredients, instructions, mealType, equipment, dietRestriction, servings, date } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert({ title, description, image, ingredients, instructions, mealType, equipment, dietRestriction, servings, owner, date },
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
              <ListField name='ingredients'/>
              <ListField name='instructions'/>
              <NumField name='servings' decimal={false} min={0}/>
              <SelectField name='mealType'/>
              <SelectField name='equipment'/>
              <SelectField name='dietRestriction'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' value={this.props.owner}/>
              <HiddenField name='date' value={new Date()}/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddRecipe.propTypes = {
  owner: PropTypes.object.isRequired,
};

export default AddRecipe;
