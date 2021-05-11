import React from 'react';
import { Card, Image, Icon, Button, Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '../../api/favorite/Favorite';
import { Recipes } from '../../api/recipe/Recipe';

/** Component for layout out a recipe Card. */
class RecipeCard extends React.Component {
  handleClick = () => this.updateLikes(this.props.recipe._id);

  updateLikes = (docID) => {
    if (this.props.favorites.find(favorite => (favorite.recipeId === docID)) === undefined) {
      Favorites.collection.insert({ recipeId: docID, owner: this.props.recipe.owner });
      Recipes.collection.update(docID, { $set: { likes: this.props.recipe.likes + 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like added successfully', 'success')));
    } else {
      Recipes.collection.update(docID, { $set: { likes: this.props.recipe.likes - 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like removed successfully', 'success')));
      Favorites.collection.remove({ recipeId: docID });
    }
  };

  render() {
    return (
      <Card centered>
        <Image fluid src={this.props.recipe.image}/>
        <Card.Content>
          <Card.Header>{this.props.recipe.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Posted on {this.props.recipe.date.toLocaleDateString('en-US')}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.recipe.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as='div' labelPosition='right'>
            <Button
              toggle
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
      </Card>
    );
  }
}

RecipeCard.propTypes = {
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
})(RecipeCard);
