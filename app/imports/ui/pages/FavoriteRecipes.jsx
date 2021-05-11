import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Card, Loader, Header, Image } from 'semantic-ui-react';
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
    // styles
    const headerStyle = { paddingTop: '15px', color: '#3E546A' };
    const contPad = { paddingBottom: '25px' };
    // array of all favs from the current user
    const favRecipes = _.filter(this.props.favorites, function (fav) {
      return fav.owner === Meteor.user().username;
    });

    return (
      <Container id="favorites-recipe-page" style={contPad}>
        <Header as="h2" textAlign="center" style={headerStyle}>My Favorites</Header>
        <Card.Group itemsPerRow={4}>
          {((_.size(favRecipes) > 0) ?
            (this.props.favorites.map((recipe, index) => <RecipeItem key={index}
              recipe={this.props.recipes.find(rec => rec._id === recipe.recipeId)}/>)) :
            (<Container textAlign='center'>
              <Header as='h3' style={headerStyle}>
                        Oops, you haven&apos;t liked any recipes yet!
                <br/>
                        Head over to Browse Recipes to like however many recipes you want.
                <br/>
                        They will be saved in your favorites page located in the top right.
              </Header>
              <Image style={contPad} centered size='medium'
                src='https://i1.wp.com/i.pinimg.com/originals/90/42/c1/9042c12fe3fea8f869b4094e3b4a9a1c.gif'/>
            </Container>)
          )}
        </Card.Group>
      </Container>
    );
  }
}

// {this.props.favorites.map((recipe, index) => <RecipeItem key={index} recipe={this.props.recipes.find(rec => rec._id === recipe.recipeId)}/>)}

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
