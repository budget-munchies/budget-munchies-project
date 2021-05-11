import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorite/Favorite';
import RecipeItem from '../components/RecipeItem';
import { Recipes } from '../../api/recipe/Recipe';

/** Renders a group of cards containing all of the Recipe documents. */
class FavoriteRecipes extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    const contPad = { paddingBottom: '25px' };
    return (
      <Container id="favorites-recipe-page" style={contPad}>
        <Header as="h2" textAlign="center" style={headerStyle}>My Favorites</Header>
        <Card.Group itemsPerRow={4}>
          {this.props.favorites.map((recipe, index) => <RecipeItem key={index} recipe={this.props.recipes.find(rec => rec._id === recipe.recipeId)}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FavoriteRecipes.propTypes = {
  favorites: PropTypes.array.isRequired,
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipe documents.
  const subscription = Meteor.subscribe(Favorites.userPublicationName);
  const subscription2 = Meteor.subscribe(Recipes.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Recipe documents
  const favorites = Favorites.collection.find({}).fetch();
  const recipes = Recipes.collection.find({}).fetch();
  return {
    favorites,
    recipes,
    ready,
  };
})(FavoriteRecipes);
