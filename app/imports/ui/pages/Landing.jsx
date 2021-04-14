import React from 'react';
import { Grid, Header, Card, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const midColor = { color: '#95AFC9' };
    const lightColor = { color: '#E3EEFA' };
    return (
      <Grid id='landing-page' >
        <Grid.Row columns={2}>
          <Grid.Column id={'left-landing'} textAlign='center'>
            <Header as={'h1'} style={lightColor}>BUDGET MUNCHIES</Header>
            <p style={lightColor}>A community where students can
              learn and share healthy, budget-friendly
              recipes</p>
          </Grid.Column>
          <Grid.Column id={'right-landing'} >
            <Header as={'h1'} style={midColor} textAlign='center'>Best of This Week</Header>
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
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
