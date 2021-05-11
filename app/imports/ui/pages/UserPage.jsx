import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Image, Container, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';
import RecipeItem from '../components/RecipeItem';

/** Renders a table containing all of the Recipes documents. Use <StuffItem> to render each row. */
class UserPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting The Recipe</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const headerColor = { color: '#3E546A' };
    const prettyPadding = { paddingBottom: '25px' };
    const textColor = { color: '#869eb5' };
    return (
      <Grid divided='vertically' relaxed container id="user-page" style={ prettyPadding }>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Image src={Meteor.user().image} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Container text style={ textColor }>
              <Header size='large' style={ headerColor }>{Meteor.user().firstName} {Meteor.user().lastName}</Header>
              <Header size='small'>Year</Header>
              <p>{Meteor.user().year}</p>
              <Header size='small'>Interests</Header>
              <p>{Meteor.user().interests}</p>
              <Header size='small'>Bio</Header>
              <p>{Meteor.user().bio}</p>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Header as="h2" textAlign="center"> My Recipes </Header>
          <Card.Group itemsPerRow={4}>
            {this.props.recipes.map((recipe, index) => <RecipeItem key={index} recipe={recipe}/>)}
          </Card.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

// Require an array of Recipes documents in the props.
UserPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Recipe that matches with the recipeID
  const recipes = Recipes.collection.find();
  return {
    recipes,
    ready,
  };
})(UserPage);
