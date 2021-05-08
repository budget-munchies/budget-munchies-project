import React from 'react';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a sinlge Recipe from the Recipe collection. See pages under the Browse Recipes dropdown
 * menu: pages/Desserts.jsx
 * */
class RecipeItem extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='medium'
            src= {this.props.recipe.image}
          />
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
            <Button icon>
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

// Require a document to be passed to this component.
RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RecipeItem);
