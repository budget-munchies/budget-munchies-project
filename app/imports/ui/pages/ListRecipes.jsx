import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';

import RecipeItem from '../components/RecipeItem';
import { Favorites } from '../../api/favorite/Favorite';

// import UserRecipeItem from '../components/UserRecipeItem';

/** Renders a table containing all of the Recipes documents associated with its creator.
 * Use <UserRecipeItem> to render each row. */
class ListRecipes extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Recipes</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    const contPad = { paddingBottom: '25px' };
    return (
      <Container id="list-recipes-page" style={contPad}>
        <Header as="h2" textAlign="center" style={headerStyle}> My Recipes </Header>
        <Card.Group itemsPerRow={4}>
          {this.props.recipes.map((recipe, index) => <RecipeItem key={index} recipe={recipe}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Recipes documents in the props.
ListRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  const favSubscription = Meteor.subscribe(Favorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && favSubscription.ready();
  // Get the Stuff documents
  const recipes = Recipes.collection.find({}).fetch();
  return {
    recipes,
    ready,
  };
})(ListRecipes);
