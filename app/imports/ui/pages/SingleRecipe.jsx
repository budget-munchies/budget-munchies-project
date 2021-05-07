import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';

/** Renders a table containing all of the Recipes documents. Use <StuffItem> to render each row. */
class SingleRecipe extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting The Recipe</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    return (
      <Grid relaxed container id="single-recipe-page">
        <Grid.Row centered>
          <Header as="h1" style={headerStyle}> {this.props.recipe.title} </Header>
        </Grid.Row>
        <Grid.Row>

        </Grid.Row>
      </Grid>
    );
  }
}

// Require an array of Recipes documents in the props.
SingleRecipe.propTypes = {
  recipe: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  //
  const recipeID = match.params._id;
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Recipe that matches with the recipeID
  const recipe = Recipes.collection.findOne(recipeID);
  return {
    recipe,
    ready,
  };
})(SingleRecipe);
