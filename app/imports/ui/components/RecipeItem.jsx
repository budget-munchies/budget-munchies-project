import React from 'react';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Recipes } from '../../api/recipe/Recipe';
import { Favorites } from '../../api/favorite/Favorite';
// import EditRecipe from '../pages/EditRecipe';

/** Renders a single Recipe from the Recipe collection. See pages under the Browse Recipes dropdown
 * menu: pages/Desserts.jsx
 * */
class RecipeItem extends React.Component {
  handleClick = () => this.updateLikes(this.props.recipe._id);

  updateLikes = (docID) => {
    if (this.props.favorites.find(favorite => (favorite.recipeId === docID)) === undefined) {
      Favorites.collection.insert({ recipeId: docID, owner: Meteor.user().username });
      Recipes.collection.update(docID, { $set: { likes: this.props.recipe.likes + 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like added successfully', 'success')));
    } else {
      const fav = this.props.favorites.find(favorite => (favorite.recipeId === docID))._id;
      Recipes.collection.update(docID, { $set: { likes: this.props.recipe.likes - 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like removed successfully', 'success')));
      Favorites.collection.remove(fav);
    }
  };

  render() {
    return (
      <Card centered>
        { Meteor.user().username === this.props.recipe.owner ? (
          <Card.Content extra>
            <Link to={`/editrecipe/${this.props.recipe._id}`}>Edit</Link>
          </Card.Content>
        ) : ''}
        <Image
          fluid
          src= {this.props.recipe.image}
        />
        <Card.Content>
          <Card.Header>
            <Link to={`/recipe/${this.props.recipe._id}`}>
              {this.props.recipe.title} ({this.props.recipe.mealType})
            </Link>
          </Card.Header>
          <Card.Meta> Posted on {this.props.recipe.date.toLocaleDateString('en-US')} </Card.Meta>
          <Card.Meta> Special Diet Restrictions: {this.props.recipe.dietRestriction}</Card.Meta>
          <Card.Description>
            {this.props.recipe.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as='div' labelPosition='right'>
            <Button
              icon
              onClick={this.handleClick}>
              <Icon name='heart'/>
              Like
            </Button>
            <Label as='a' basic pointing='left'>
              {this.props.recipe.likes}
            </Label>
          </Button>
        </Card.Content>
        <Card.Content extra>
          Added by: {this.props.recipe.owner}
        </Card.Content>
      </Card>
    );
  }
}

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  const subscription2 = Meteor.subscribe(Favorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const recipes = Recipes.collection.find({}).fetch();
  const favorites = Favorites.collection.find({}).fetch();
  return {
    recipes,
    ready,
    favorites,
  };
})(RecipeItem);
