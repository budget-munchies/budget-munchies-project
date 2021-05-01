import React from 'react';
import { Card, Image, Icon, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Component for layout out a recipe Card. */
class RecipeCard extends React.Component {
  state = { log: [] }

  handleClick = () => this.updateLog('Button received click with mouse')

  handleKeyPress = (e) => {
    if (e.charCode === 32 || e.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault();
      this.updateLog('Button received click with keyboard');
    }
  }

  updateLog = (message) => this.setState((prevState) => ({ log: [message, ...prevState.log] }))

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
              onClick={this.handleClick}
              onKeyPress={this.handleKeyPress}>
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
