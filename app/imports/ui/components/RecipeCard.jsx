import React from 'react';
import { Card, Image, Icon, Button, Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '../../api/favorite/Favorite';
import { Recipes } from '../../api/recipe/Recipe';

/** Component for layout out a recipe Card. */
class RecipeCard extends React.Component {
  handleClick = () => this.updateLikes();

  updateLikes = () => {
    if (!this.props.currentUser.favorites.find( this.props.favorites.recipeId === this.props.recipe._id )) {
      Favorites.collection.insert({ recipeId: this.props.recipe._id, owner: this.props.recipe.owner });
      Recipes.collection.update(this.props.recipe._id, { $set: { likes: this.props.recipe.likes + 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like added successfully', 'success')));
    } else {
      Recipes.collection.update(this.props.recipe._id, { $set: { likes: this.props.recipe.likes - 1 } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Like removed successfully', 'success')));
      Favorites.collection.findOneAndDelete({ recipeId: this.props.recipe._id });
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
  currentUser: Meteor.user() ? Meteor.user().username : '',
};

export default withRouter(RecipeCard);
