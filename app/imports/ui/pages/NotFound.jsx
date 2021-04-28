import React from 'react';
import { Container, Image } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    const textStyle = { paddingTop: '15px', marginBottom: '-0.1px' };
    return (
      <Container fluid textAlign='center' id='notFound'>
        <p style={textStyle}>
          Sorry, that page was not found.
        </p>
        <p className={'cookies'}>
          Have some cookies instead.
        </p>
        <Image src={'/images/notFound-cookies.jpg'} size='massive' centered/>
        <p className={'credit'}>
          Photo by <a href="https://unsplash.com/@thecreative_exchange?utm_source=unsplash&utm_medium=
          referral&utm_content=creditCopyText">The Creative Exchange</a> on <a href="https://unsplash.com/s/photos/cookies?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </p>
      </Container>
    );
  }
}

export default NotFound;
