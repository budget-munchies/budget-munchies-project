import React from 'react';
import { Grid, Header, Card, Image, Icon, Button, Label } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const midColor = { color: '#95AFC9' };
    const lightColor = { color: '#E3EEFA' };
    const imgheight = { height: '200px' };
    return (
      <Grid id='landing-page'>
        <Grid.Row columns={2}>
          <Grid.Column id={'left-landing'} textAlign='center'>
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
          </Grid.Column>
          <Grid.Column id={'right-landing'}>
            <Header as={'h1'} style={midColor} textAlign='center'>Best of This Week</Header>
            <Card.Group>
              <Card>
                <Image src='https://weeattogether.com/wp-content/uploads/2018/02/6-Amazing-Food-Photography-Tricks-You-Need-To-Know-Pancakes.jpg' size={'medium'} centered />
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
                <Image src='https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2020/Donna-Crous-food-photography/Media/Donna-Crous-food-photography-Popcorn-hand-n-triangle-styling.jpg' size={'medium'} centered/>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
