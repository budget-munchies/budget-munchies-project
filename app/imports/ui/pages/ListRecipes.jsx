import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Card, Header, Loader, Image } from 'semantic-ui-react';
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
    // styles
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    const contPad = { paddingBottom: '50px' };
    // array of all recipes from the current user
    const userRecipes = _.filter(this.props.recipes, function (recipe) {
      return recipe.owner === Meteor.user().username;
    });
    return (
      <Container id="list-recipes-page" style={contPad}>
        <Header as="h1" textAlign="center" style={headerStyle}> My Recipes </Header>
        <Card.Group itemsPerRow={4}>
          {((_.size(userRecipes) > 0) ?
            (this.props.recipes.map((recipe, index) => <RecipeItem key={index} recipe={recipe}/>)) :
            (<Container textAlign='center'>
              <Header as='h3' style={headerStyle}>
                Oops, you haven&apos;t added any recipes yet!
                <br/>
                Head over to Add Recipes to post your yummy recipes.
              </Header>
              <Image style={contPad} centered size='medium' src='https://media0.giphy.com/media/cJYy5eegnMXuaDybIR/giphy.gif'/>
            </Container>)
          )}
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
