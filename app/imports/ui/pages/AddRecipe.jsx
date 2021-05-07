import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { PropTypes } from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';

const bridge = new SimpleSchema2Bridge(Recipes.schema);

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, description, image, ingredients, instructions, mealType, equipment, dietRestrictions, servings, createdAt } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert({ title, description, image, ingredients, instructions, mealType, equipment, dietRestrictions, servings, owner, createdAt },
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
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" style={headerStyle}>Add Recipe</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='title'/>
              <TextField name='image'/>
              <LongTextField name='description'/>
              <TextField name='ingredients'/>
              <LongTextField name='instructions'/>
              <NumField name='servings' decimal={false}/>
              <SelectField name='mealType'/>
              <SelectField name='equipment'/>
              <SelectField name='dietRestrictions'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' value={this.props.owner}/>
              <HiddenField name='createdAt' value={new Date()}/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddRecipe.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddRecipe;
