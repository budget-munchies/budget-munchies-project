import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Image, List, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';

/** Renders a table containing all of the Recipes documents. Use <StuffItem> to render each row. */
class SingleRecipe extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting The Recipe</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const headerColor = { color: '#3E546A' };
    const titleStyle = { color: '#3E546A', paddingTop: '10px', paddingBottom: '10px' };
    const prettyPadding = { paddingBottom: '20px' };
    const textColor = { color: '#869eb5' };
    return (
      <Grid relaxed container id="single-recipe-page" style={ prettyPadding }>
        <Grid.Row centered>
          <Header as="h1" style={titleStyle}> {this.props.recipe.title} </Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Image
              floated='left'
              size='large'
              src= {this.props.recipe.image}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Header as="h2" style={headerColor}>Recipe Description</Header>
              <p style={textColor}> {this.props.recipe.description} </p>
              <Header as="h2" style={headerColor}>Meal Type</Header>
              <p style={textColor}> {this.props.recipe.mealType} </p>
              <Header as="h2" style={headerColor}>Diet Restrictions</Header>
              <p style={textColor}> {this.props.recipe.dietRestriction} </p>
              <Header as="h2" style={headerColor}>Servings</Header>
              <p style={textColor}> {this.props.recipe.servings} </p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <Segment>
              <Header as="h2" style={headerColor}> Ingredients Needed: </Header>
              <List size={'large'} bulleted items={this.props.recipe.ingredients} style={textColor}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as="h2" style={headerColor}> Instructions: </Header>
              <List size={'large'} bulleted items={this.props.recipe.instructions} style={textColor}/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

// Require an array of Recipes documents in the props.
SingleRecipe.propTypes = {
  recipe: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  //
  const recipeID = match.params._id;
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Recipes.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Recipe that matches with the recipeID
  const recipe = Recipes.collection.findOne(recipeID);
  return {
    recipe,
    ready,
  };
})(SingleRecipe);
