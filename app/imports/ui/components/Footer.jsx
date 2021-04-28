import React from 'react';
import { Input, Icon, Grid, GridColumn } from 'semantic-ui-react';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: '#E3EEFA' };
    return (
      <footer>
        <div style={divStyle} id='footer' className="ui center aligned fluid container">
            Budget Munchies is a project by students, for students!<br/>
            Contact Budget Munchies at budgetmunchies@hawaii.edu<br />
            Sign up to get our email updates!<br />
          <br/>
          <Grid>
            <Grid.Row columns={2}>
              <GridColumn>
                <Icon link name='home' />
                <a href="https://
                budget-munchies.github.io">  Budget Munchies Home Page</a>
              </GridColumn>
              <GridColumn>
                <Input
                  action={ { color: 'blue', content: 'Join' } }
                  placeholder="Enter Email Address"/>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </div>
      </footer>
    );
  }
}

export default Footer;
