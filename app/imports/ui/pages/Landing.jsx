import React from 'react';
import { Grid, Header, Card, Image, Icon, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import RecipeCard from '../components/RecipeCard';
import { Recipes } from '../../api/recipe/Recipe';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Recipes</Loader>;
  }

  renderPage() {
    // const midColor = { color: '#7f9ab5' };
    const lightColor = { color: '#E3EEFA' };
    const rightHeader = { paddingTop: '10px', paddingBottom: '20px', color: '#7f9ab5' };
    const imgheight = { height: '200px' };
    const bestRec = _.sortBy(this.props.recipes, 'likes');
    return (
      <div id={'wrapper'}>
        <Grid id='landing-page'>
          <Grid.Row columns={2}>
            <Grid.Column width={6} id={'left-landing'} textAlign='center'>
              <Image style={imgheight} src='/images/bm-logotryagain.svg' size={'medium'} centered/>
              <Grid.Row>
                <Icon name={'users'} size={'big'} style={lightColor}/>
                <Header as={'h2'} style={lightColor}> Cooking Community </Header>
                <Header as={'h4'} style={lightColor}> This site is a way for college students to connect with others
                  <br/> who are interested in saving money and eating healthy. </Header>
              </Grid.Row>
              <br/>
              <Grid.Row>
                <Icon name={'pencil alternate'} size={'big'} style={lightColor}/>
                <Header as={'h2'} style={lightColor}> Share Recipes </Header>
                <Header as={'h4'} style={lightColor}> Recipes will include a title, image, ingredients, instructions,
                  <br/> equipment needed, dietary restrictions, and amount of servings. <br/> Users can like recipes
                  and save them to make later.
                </Header>
              </Grid.Row>
              <br/>
              <br/>
              <Grid.Row>
                <Icon name={'shopping cart'} size={'big'} style={lightColor}/>
                <Header as={'h2'} style={lightColor}> Explore Vendors </Header>
                <Header as={'h4'} style={lightColor}> Students are able to see stores, local shops, and pop-ups that
                  <br/> sell any ingredients used or cheap eats.
                </Header>
              </Grid.Row>
              <br/>
            </Grid.Column>
            <Grid.Column width={10} id={'right-landing'}>
              <Header as={'h1'} style={rightHeader} textAlign='center'>Best of This Week</Header>
              <Card.Group>
                <Card.Group itemsPerRow={3}>
                  <RecipeCard recipe={bestRec[bestRec.length - 1]}/>
                  <RecipeCard recipe={bestRec[bestRec.length - 2]}/>
                  <RecipeCard recipe={bestRec[bestRec.length - 3]}/>
                </Card.Group>
              </Card.Group>
              <br/>
              <br/>
              <Image centered src={'https://i.gifer.com/origin/63/63fdd4927dcad26ada255c301a3601b0.gif'}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Landing.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.worldPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const recipes = Recipes.collection.find({}).fetch();
  return {
    recipes,
    ready,
  };
})(Landing);
