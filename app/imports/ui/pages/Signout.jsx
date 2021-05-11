import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    // styles
    const headerStyle = { color: '#3E546A' };
    const imageSize = { width: '120  !important', height: '85.23  !important' };
    const contPad = { paddingTop: '25px', paddingBottom: '100px' };
    // other
    Meteor.logout();
    return (
      <Container id="signout-page" style={contPad}>
        <Header as="h2" textAlign="center" style={headerStyle}>
          You are signed out.
          <br/>
        </Header>
        <Image centered src={'https://i.imgur.com/ZzRyKnB.gif'} style={imageSize}/>
        <Header as="h2" textAlign="center" style={headerStyle}>
          Have a great day!
          <br/>
        </Header>
      </Container>
    );
  }
}
