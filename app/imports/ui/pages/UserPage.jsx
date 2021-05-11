import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid, Image, Container, Card, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';
import RecipeItem from '../components/RecipeItem';
import { Users } from '../../api/user/User';

/** Renders a table containing all of the Recipes documents. Use <StuffItem> to render each row. */
class UserPage extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting The Recipe</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const headerColor = { color: '#3E546A' };
    const prettyPadding = { paddingTop: '25px', paddingBottom: '25px' };
    const textColor = { color: '#869eb5' };
    return (
      <Grid divided='vertically' relaxed container id="user-page" style={ prettyPadding }>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Image rounded size='medium' src={this.props.user.image} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Container text className='description'>
              <Header as='h2' style={ headerColor }>{this.props.user.firstName} {this.props.user.lastName}</Header>
              <Header as='h3' style={ headerColor }>Year</Header>
              <p style={textColor}>{this.props.user.year}</p>
              <Header as='h3' style={ headerColor }>Interests</Header>
              <List style={textColor} bulleted items={this.props.user.interests}/>
              <Header as='h3' style={ headerColor }>Bio</Header>
              <p style={textColor}>{this.props.user.bio}</p>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Container textAlign='center'>
            <Header as='h2' style={ headerColor }> My Recipes </Header>
            <Card.Group itemsPerRow={4}>
              {this.props.recipes.map((recipe, index) => <RecipeItem key={index} recipe={recipe}/>)}
            </Card.Group>
          </Container>
        </Grid.Row>
      </Grid>
    );
  }
}

// Require an array of Recipes documents in the props.
UserPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipes documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  const sub2 = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && sub2.ready();
  // Get the Recipe that matches with the recipeID
  const recipes = Recipes.collection.find({}).fetch();
  const user = Users.collection.findOne();
  return {
    recipes,
    ready,
    user,
  };
})(UserPage);
