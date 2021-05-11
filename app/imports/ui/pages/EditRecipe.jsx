import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm, DateField,
  ErrorsField, ListField,
  NumField, SelectField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Recipes } from '../../api/recipe/Recipe';

const bridge = new SimpleSchema2Bridge(Recipes.schema);

/** Renders the Page for editing a single document. */
class EditRecipe extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { title, date, image, description, ingredients, instructions, mealType, equipment, dietRestriction, servings, _id } = data;
    Recipes.collection.update(_id, { $set: { title, date, image, description, ingredients, instructions, mealType, equipment, dietRestriction, servings } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Recipe updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Recipe</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    const btmarg = { marginBottom: '25px' };
    return (
      <Grid container id="edit-recipe-page" centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" style={headerStyle}>Edit Recipe</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
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

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditRecipe.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Recipes.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditRecipe);
