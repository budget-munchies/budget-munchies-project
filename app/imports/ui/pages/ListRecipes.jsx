import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';
import RecipeCard from '../components/RecipeItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="list-stuff-page">
        <Header as="h2" textAlign="center">My Recipes</Header>
        <Card.Group itemsPerRow={4}>
          {this.props.recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const recipes = Recipes.collection.find({}).fetch();
  return {
    recipes,
    ready,
  };
})(ListRecipes);
