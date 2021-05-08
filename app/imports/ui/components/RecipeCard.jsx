import React from 'react';
import { Card, Image, Icon, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Favorites } from '../../api/favorite/Favorite';

/** Component for layout out a recipe Card. */
class RecipeCard extends React.Component {
  handleClick = () => this.updateLikes();

  updateLikes = () => { (Favorites.collection.insert({ recipeId: this.props.recipe._id, owner: this.props.recipe.owner })); this.props.favorite.likes++; };

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
  favorite: PropTypes.object.isRequired,
};

export default withRouter(RecipeCard);
