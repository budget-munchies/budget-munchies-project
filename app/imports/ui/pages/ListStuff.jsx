import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Recipe List</Header>
        <Card.Group>
          <Card>
            <Image src='https://weeattogether.com/wp-content/uploads/2018/02/6-Amazing-Food-Photography-Tricks-You-Need-To-Know-Pancakes.jpg' size={'medium'} />
            <Card.Content>
              <Card.Header>Maple Pecan Pancakes</Card.Header>
              <Card.Meta>
                <span className='date'>Posted on 04/13/21</span>
              </Card.Meta>
              <Card.Description>
                College student-friendly maple pecan pancakes made from scratch.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart' />
                  Like
                </Button>
                <Label as='a' basic pointing='left'>
                  2,048
                </Label>
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <Image src='https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2020/Donna-Crous-food-photography/Media/Donna-Crous-food-photography-Popcorn-hand-n-triangle-styling.jpg' size={'medium'} />
            <Card.Content>
              <Card.Header>Buttered Popcorn</Card.Header>
              <Card.Meta>
                <span className='date'>Posted on 04/13/21</span>
              </Card.Meta>
              <Card.Description>
                A healthy, budget-friendly, addicting snack for after class.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart'/>
                  Like
                </Button>
                <Label as='a' basic pointing='left'>
                  2,022
                </Label>
              </Button></Card.Content>
          </Card>
          <Card>
            <Image src='https://weeattogether.com/wp-content/uploads/2018/02/6-Amazing-Food-Photography-Tricks-You-Need-To-Know-Pancakes.jpg' size={'medium'} />
            <Card.Content>
              <Card.Header>Maple Pecan Pancakes</Card.Header>
              <Card.Meta>
                <span className='date'>Posted on 04/13/21</span>
              </Card.Meta>
              <Card.Description>
                  College student-friendly maple pecan pancakes made from scratch.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart' />
                    Like
                </Button>
                <Label as='a' basic pointing='left'>
                    2,048
                </Label>
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <Image src='https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2020/Donna-Crous-food-photography/Media/Donna-Crous-food-photography-Popcorn-hand-n-triangle-styling.jpg' size={'medium'} />
            <Card.Content>
              <Card.Header>Buttered Popcorn</Card.Header>
              <Card.Meta>
                <span className='date'>Posted on 04/13/21</span>
              </Card.Meta>
              <Card.Description>
                  A healthy, budget-friendly, addicting snack for after class.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button as='div' labelPosition='right'>
                <Button icon>
                  <Icon name='heart'/>
                    Like
                </Button>
                <Label as='a' basic pointing='left'>
                    2,022
                </Label>
              </Button></Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(ListStuff);
