import React from 'react';
import { Input } from 'semantic-ui-react';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container" color='white'>
          <hr />
          Contact Budget Munchies at nkimoto@hawaii.edu<br />
          Sign up to get our email updates!<br />
          <Input
            action={ { color: 'black', content: 'Join' } }
            placeholder="Enter Email Address"/>
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
