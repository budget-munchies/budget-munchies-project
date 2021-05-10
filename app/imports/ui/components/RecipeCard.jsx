import React from 'react';
import { Card, Image, Icon, Button, Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Favorites } from '../../api/favorite/Favorite';
import { Recipes } from '../../api/recipe/Recipe';

/** Component for layout out a recipe Card. */
class RecipeCard extends React.Component {
  updateLikes = (docID) => {
    if ((_.find(Favorites, function (fav) { return fav.recipeId === docID; })) === undefined) {
      Favorites.collection.insert({ recipeId: docID, owner: this.props.recipe.owner });
      Recipes.collection.update(docID, { $set: { likes: this.props.recipe.likes + 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like added successfully', 'success')));
    } else {
      Recipes.collection.update(docID, { $set: { likes: this.props.recipe.likes - 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like removed successfully', 'success')));
      Favorites.collection.remove(docID);
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
              icon
              onClick={this.updateLikes(this.props.recipe._id)}>
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
};

export default withRouter(RecipeCard);
