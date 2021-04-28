import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Component for layout out a recipe Card. */
export const RecipeCard = (props) => (
  <Card>
    <Card.Content>
      <Image size="medium" src={props.recipe.image} />
      <Card.Header>{props.recipe.title}</Card.Header>
      <Card.Meta>
        <span><Icon name="heart outline" />{props.recipe.likes}</span>
      </Card.Meta>
      <Card.Description>
        {props.recipe.description}
      </Card.Description>
    </Card.Content>
  </Card>
);

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};
