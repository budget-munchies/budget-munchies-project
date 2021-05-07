import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Favorites } from '../../api/favorite/Favorite';
import { RecipeCard } from '../components/RecipeCard';

/** Renders a group of cards containing all of the Recipe documents. */
class FavoriteRecipes extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="favorites-page">
        <Card.Group>
          { _.map(this.props.favorites, (recipe, index) => <RecipeCard key={index} recipe={recipe}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FavoriteRecipes.propTypes = {
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipe documents.
  const subscription = Meteor.subscribe(Favorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Recipe documents
  const recipes = Favorites.collection.find({}).fetch();
  return {
    recipes,
    ready,
  };
})(FavoriteRecipes);