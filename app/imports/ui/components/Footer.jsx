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
          Budget Munchies is a project by students, for students!<br/>
          Contact Budget Munchies at budgetmunchies@hawaii.edu<br />
          Sign up to get our email updates!<br />
          <Input
            action={ { color: 'black', content: 'Join' } }
            placeholder="Enter Email Address"/>
          <a href="https://budget-munchies.github.io">Budget Munchies Home Page</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
