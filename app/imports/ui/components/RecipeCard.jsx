import React from 'react';
import { Card, Image, Icon, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorite/Favorite';

/** Component for layout out a recipe Card. */
class RecipeCard extends React.Component {
  handleClick = () => this.updateLikes();

  updateLikes = () => (Favorites.collection.insert({ _id: this.props.recipe._id, title: this.props.recipe.title, owner: this.props.recipe.owner }));

  render() {
    return (
      <Card>
        <Image size="medium" src={this.props.recipe.image}/>
        <Card.Content>
          <Card.Header>{this.props.recipe.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Posted on {this.props.recipe.createdAt}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.recipe.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as='div' labelPosition='right'>
            <Button
              icon
              content='Click'
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
};
