import React from 'react';
import { Header, Container, Divider } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    return (
      <Container>
        <Divider/>
        <Header as="h2" textAlign="center" inverted>
          <p> page not found :( </p>
          <p>this page does not currently exist</p>
        </Header>
        <Divider/>
      </Container>
    );
  }
}

export default NotFound;
